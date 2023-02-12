import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  CompletionItem,
  CompletionItemKind,
  TextDocumentSyncKind,
  InitializeResult,
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
    },
  };

  return result;
});

documents.onDidChangeContent((change) => {
  identifyTickets(change.document);
});

async function identifyTickets(textDocument: TextDocument): Promise<void> {
  if (teamKeys.size === 0) {
    return;
  }

  const text = textDocument.getText();
  const diagnostics: Diagnostic[] = [];
  const documentPositions: Array<IssuePosition> = [];

  Array.from(teamKeys)
    .flatMap((prefix) => {
      return Array.from(text.matchAll(new RegExp(`${prefix}-[0-9]*`, "g")));
    })
    .forEach((m) => {
      const issueKey = m[0];
      const positionStart = textDocument.positionAt(m.index ?? 0);
      const positionEnd = textDocument.positionAt(
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
        offsetStart: textDocument.offsetAt(positionStart),
        offsetEnd: textDocument.offsetAt(positionEnd),
      });

      diagnostics.push({
        source: "Linear",
        message: issueKey,
        severity: DiagnosticSeverity.Information,
        range: {
          start: positionStart,
          end: positionEnd,
        },
      });
    });

  issuePositions.set(textDocument.uri, documentPositions);
  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

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

documents.listen(connection);

connection.listen();
