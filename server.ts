import { type Issue, type IssueSearchPayload, LinearClient } from "@linear/sdk";
import {
	type CodeAction,
	CodeActionKind,
	CodeActionTriggerKind,
	type CompletionItem,
	CompletionItemKind,
	createConnection,
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

const conn = createConnection(ProposedFeatures.all);
const docs = new TextDocuments(TextDocument);
const teams = new Map<string, string>();
const issues = new Map<string, Issue | undefined>();
const positions = new Map<string, Array<IssuePosition>>();

let client: LinearClient;

conn.onInitialize(async () => {
	const apiKey = process.env.LINEAR_API_KEY;
	if (!apiKey) {
		conn.window.showWarningMessage(
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

	return {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			codeActionProvider: {},
			executeCommandProvider: {
				commands: ["linear-ls.createTicket"],
			},
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
});

conn.onCodeAction((params) => {
	if (params.context.triggerKind === CodeActionTriggerKind.Invoked) {
		const textDocument = docs.get(params.textDocument.uri);
		if (!textDocument) {
			return;
		}

		const text = textDocument.getText(params.range);
		if (!text) {
			return;
		}

		const action: CodeAction = {
			title: "Create Ticket from Selection",
			kind: CodeActionKind.RefactorRewrite,
			command: {
				command: "linear-ls.createTicket",
				title: "Create Ticket",
				arguments: [params.textDocument.uri, params.range, text.trim()],
			},
		};

		return [action];
	}
});

conn.onExecuteCommand(async (params) => {
	if (params.command === "linear-ls.createTicket") {
		const [uri, range, title] = params.arguments || [];
		if (!uri || !range || !title) {
			return;
		}

		if (teams.size === 0) {
			conn.window.showErrorMessage(
				"No teams found. Please ensure you have access to at least one Linear team.",
			);
			return;
		}

		// Use the first team found
		const teamId = teams.values().next().value;
		if (!teamId) {
			return;
		}

		try {
			const issue = await client.createIssue({ teamId, title });
			const createdIssue = await issue.issue;

			if (createdIssue) {
				const identifier = createdIssue.identifier;
				const url = createdIssue.url;
				const link = `[${identifier}](${url})`;

				const edit = {
					changes: {
						[uri]: [
							{
								range: range,
								newText: link,
							},
						],
					},
				};

				await conn.workspace.applyEdit(edit);
			}
		} catch (e) {
			conn.console.error(`Error creating issue: ${e}`);
			conn.window.showErrorMessage(`Failed to create Linear issue: ${e}`);
		}
	}
});

let documentChangeTimeout: NodeJS.Timeout;
docs.onDidChangeContent((change) => {
	clearTimeout(documentChangeTimeout);
	documentChangeTimeout = setTimeout(() => {
		const text = change.document.getText();
		const documentPositions: Array<IssuePosition> = [];
		const teamKeys = Array.from(teams.keys());

		if (teamKeys.length === 0) {
			positions.set(change.document.uri, []);
			return;
		}

		const regexp = new RegExp(`(${teamKeys.join("|")})-[0-9]*`, "g");

		Array.from(text.matchAll(regexp)).forEach((m) => {
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

		positions.set(change.document.uri, documentPositions);
	}, 200);
});

conn.onHover(async (params) => {
	const documentPositions = positions.get(params.textDocument.uri);
	if (!documentPositions) {
		return;
	}

	const textDocument = docs.get(params.textDocument.uri);
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

conn.onCompletion(async (params): Promise<CompletionItem[]> => {
	if (teams.size === 0) {
		return [];
	}

	const document = docs.get(params.textDocument.uri);
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
		conn.console.error(`LLS: Error searching issues: ${e}`);
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

conn.languages.semanticTokens.on((params) => {
	const docPositions = positions.get(params.textDocument.uri);
	if (!docPositions) {
		return { data: [] };
	}

	const builder = new SemanticTokensBuilder();

	for (const p of docPositions) {
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

docs.listen(conn);

conn.listen();
