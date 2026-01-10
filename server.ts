import { type Issue, type IssueSearchPayload, LinearClient } from "@linear/sdk";
import {
	CodeActionTriggerKind,
	type CompletionItem,
	CompletionItemKind,
	createConnection,
	type InitializeResult,
	ProposedFeatures,
	SemanticTokensBuilder,
	SemanticTokenTypes,
	TextDocumentSyncKind,
	TextDocuments,
} from "vscode-languageserver/node";
import {
	type Position,
	TextDocument,
} from "vscode-languageserver-textdocument";

type IssuePosition = {
	issueKey: string;
	positionStart: Position;
	positionEnd: Position;
	offsetStart: number;
	offsetEnd: number;
};

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const teams = new Map<string, string>();
const issues = new Map<string, Issue | undefined>();
const issuePositions = new Map<string, Array<IssuePosition>>();

let client: LinearClient;

connection.onInitialize(async () => {
	const apiKey = process.env.LINEAR_API_KEY;
	if (!apiKey) {
		connection.window.showWarningMessage(
			"Linear API Key not found. Please set the LINEAR_API_KEY environment variable.",
		);

		return { capabilities: {} };
	}

	client = new LinearClient({ apiKey });

	await client.teams().then((ts) => {
		ts.nodes.forEach((t) => {
			teams.set(t.key, t.id);
		});
	});

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			codeActionProvider: {},
			hoverProvider: {},
			completionProvider: { resolveProvider: true },
			semanticTokensProvider: {
				legend: {
					tokenTypes: [SemanticTokenTypes.variable],
					tokenModifiers: [],
				},
				full: true,
			},
		},
	};

	return result;
});

connection.onCodeAction((params) => {
	if (params.context.triggerKind === CodeActionTriggerKind.Invoked) {
		const textDocument = documents.get(params.textDocument.uri);
		if (!textDocument) {
			return;
		}

		const text = textDocument.getText(params.range);
		if (!text) {
			return;
		}

		// TODO: Implement command to create ticket
		return [{ title: "Create Ticket" }];
	}
});

let documentChangeTimeout: NodeJS.Timeout;
documents.onDidChangeContent((change) => {
	clearTimeout(documentChangeTimeout);
	documentChangeTimeout = setTimeout(() => {
		const text = change.document.getText();
		const documentPositions: Array<IssuePosition> = [];

		Array.from(teams.keys())
			.flatMap((prefix) => {
				return Array.from(text.matchAll(new RegExp(`${prefix}-[0-9]*`, "g")));
			})
			.forEach((m) => {
				const issueKey = m[0];
				const positionStart = change.document.positionAt(m.index ?? 0);
				const positionEnd = change.document.positionAt(
					issueKey.length + (m.index ?? 0),
				);

				// Write down that we've seen the issue, but don't
				// fetch the definition just yet.
				if (!issues.has(issueKey)) {
					issues.set(issueKey, undefined);
				}

				documentPositions.push({
					issueKey,
					positionStart,
					positionEnd,
					offsetStart: change.document.offsetAt(positionStart),
					offsetEnd: change.document.offsetAt(positionEnd),
				});
			});

		issuePositions.set(change.document.uri, documentPositions);
	}, 200);
});

connection.onHover(async (params) => {
	const documentPositions = issuePositions.get(params.textDocument.uri);
	if (!documentPositions) {
		return;
	}

	const textDocument = documents.get(params.textDocument.uri);
	if (!textDocument) {
		return;
	}

	const cursorOffset = textDocument.offsetAt(params.position);
	const targetIssue = documentPositions.find(
		(dp) => dp.offsetStart <= cursorOffset && dp.offsetEnd > cursorOffset,
	);

	if (!targetIssue) {
		return;
	}

	const issueFromCache = issues.get(targetIssue.issueKey);
	if (issueFromCache) {
		return {
			contents: issueFromCache.description ?? "Not available",
		};
	}

	const issue = await client.issue(targetIssue.issueKey);
	if (!issue) {
		return;
	}

	issues.set(targetIssue.issueKey, issue);

	return {
		contents: issue.description ?? "Not available",
	};
});

connection.onCompletion(async (params): Promise<CompletionItem[]> => {
	if (teams.size === 0) {
		return [];
	}

	const document = documents.get(params.textDocument.uri);
	if (!document) {
		return [];
	}

	const lineToPosition = document?.getText({
		start: { line: params.position.line, character: 0 },
		end: { line: params.position.line, character: params.position.character },
	});

	const lastMatch = Array.from(teams.keys())
		.flatMap((prefix) =>
			Array.from(lineToPosition.matchAll(new RegExp(`(${prefix})-(.*)`, "g"))),
		)
		.at(-1);

	if (!lastMatch) {
		return [];
	}

	const [, teamKey, searchString] = lastMatch;
	if (!teamKey || !searchString) {
		return [];
	}

	let issues: IssueSearchPayload;
	try {
		issues = await client.searchIssues(searchString, {
			teamId: teams.get(teamKey),
		});
	} catch (e) {
		connection.console.error(`LLS: Error searching issues: ${e}`);
		return [];
	}

	return issues.nodes.map((i) => {
		let label = `${i.identifier}: ${i.title}`;
		if (label.length > 60) {
			label = `${label.substring(0, 60)}...`;
		}

		return {
			data: i,
			detail: i.description ?? "Not available",
			insertText: `[${i.identifier}](${i.url})`,
			label,
			kind: CompletionItemKind.Reference,
		};
	});
});

connection.languages.semanticTokens.on((params) => {
	const positions = issuePositions.get(params.textDocument.uri);
	if (!positions) {
		return { data: [] };
	}

	const builder = new SemanticTokensBuilder();

	positions.sort((a, b) => {
		if (a.positionStart.line !== b.positionStart.line) {
			return a.positionStart.line - b.positionStart.line;
		}

		return a.positionStart.character - b.positionStart.character;
	});

	for (const p of positions) {
		// Semantic tokens are assumed to be single-line. If a token ever spans multiple
		// lines, its length must be calculated differently. For now, we ignore such ranges.
		if (p.positionStart.line !== p.positionEnd.line) {
			continue;
		}

		const length = p.positionEnd.character - p.positionStart.character;

		builder.push(
			p.positionStart.line,
			p.positionStart.character,
			length,
			0, // token type index (0 = variable, as defined in legend)
			0, // token modifiers (none)
		);
	}

	return builder.build();
});

documents.listen(connection);

connection.listen();
