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
import { TextDocument } from "vscode-languageserver-textdocument";
import { findIssues, getTeamKeys } from "./linear";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const teamKeys = new Set<string>();

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
      completionProvider: {
        resolveProvider: true,
      },
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

  Array.from(teamKeys)
    .flatMap((prefix) => {
      return Array.from(text.matchAll(new RegExp(`${prefix}-[0-9]*`, "g")));
    })
    .forEach((m) => {
      diagnostics.push({
        source: "Linear",
        message: m[0],
        severity: DiagnosticSeverity.Information,
        range: {
          start: textDocument.positionAt(m.index ?? 0),
          end: textDocument.positionAt((m.index ?? 0) + m[0].length),
        },
      });
    });

  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

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

  const issues = await findIssues([teamKey], searchString);
  if (issues === undefined) {
    return [];
  }

  // TODO: Edit text action to support sentences
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
