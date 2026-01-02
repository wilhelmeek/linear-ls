import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  CompletionItem,
  CompletionItemKind,
  TextDocumentSyncKind,
  InitializeResult,
  CodeActionTriggerKind,
  SemanticTokensBuilder,
  SemanticTokenTypes,
} from "vscode-languageserver/node";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { findIssuesByTitle, getIssueByKey, getTeamKeys } from "./linear";
import { IssueFragment } from "./types.generated";

type IssuePosition = {
  issueKey: string;
  positionStart: Position;
  positionEnd: Position;
  offsetStart: number;
  offsetEnd: number;
};

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const teamKeys = new Set<string>();
const issues = new Map<string, IssueFragment | undefined>();
const issuePositions = new Map<string, Array<IssuePosition>>();

connection.onInitialize(async () => {
  await getTeamKeys().then((keys) => {
    keys.map((k) => {
      teamKeys.add(k);
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

documents.onDidChangeContent((change) => {
  const text = change.document.getText();
  const documentPositions: Array<IssuePosition> = [];

  Array.from(teamKeys)
    .flatMap((prefix) => {
      return Array.from(text.matchAll(new RegExp(`${prefix}-[0-9]*`, "g")));
    })
    .forEach((m) => {
      const issueKey = m[0];
      const positionStart = change.document.positionAt(m.index ?? 0);
      const positionEnd = change.document.positionAt(
        issueKey.length + (m.index ?? 0)
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
    (dp) => dp.offsetStart <= cursorOffset && dp.offsetEnd > cursorOffset
  );

  if (!targetIssue) {
    return;
  }

  const issue = await getIssueByKey(targetIssue.issueKey);
  if (!issue) {
    return;
  }

  return {
    contents: issue.description ?? "Not available",
  };
});

connection.onCompletion(async (params): Promise<CompletionItem[]> => {
  if (teamKeys.size === 0) {
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

  const lastMatch = Array.from(teamKeys)
    .flatMap((prefix) =>
      Array.from(lineToPosition.matchAll(new RegExp(`(${prefix})-(.*)`, "g")))
    )
    .at(-1);

  if (!lastMatch) {
    return [];
  }

  const [, teamKey, searchString] = lastMatch;
  if (!teamKey || !searchString) {
    return [];
  }

  const issues = await findIssuesByTitle([teamKey], searchString);
  if (issues === undefined) {
    return [];
  }

  return issues.map((issue) => {
    let label = `${issue.identifier}: ${issue.title}`;
    if (label.length > 60) {
      label = label.substring(0, 60) + "...";
    }

    return {
      data: issue,
      detail: issue.description ?? "Not available",
      insertText: `[${issue.identifier}](${issue.url})`,
      filterText: `${issue.team.key}-${issue.title}`,
      label,
      kind: CompletionItemKind.Reference,
    };
  });
});

connection.languages.semanticTokens.on((params) => {
  const documentPositions = issuePositions.get(params.textDocument.uri);
  if (!documentPositions) {
    return { data: [] };
  }

  const textDocument = documents.get(params.textDocument.uri);
  if (!textDocument) {
    return { data: [] };
  }

  const builder = new SemanticTokensBuilder();

  // Sort positions by line and character to ensure proper ordering
  const sortedPositions = [...documentPositions].sort((a, b) => {
    if (a.positionStart.line !== b.positionStart.line) {
      return a.positionStart.line - b.positionStart.line;
    }
    return a.positionStart.character - b.positionStart.character;
  });

  for (const position of sortedPositions) {
    const length =
      position.positionEnd.character - position.positionStart.character;
    builder.push(
      position.positionStart.line,
      position.positionStart.character,
      length,
      0, // token type index (0 = variable, as defined in legend)
      0 // token modifiers (none)
    );
  }

  return builder.build();
});

documents.listen(connection);

connection.listen();
