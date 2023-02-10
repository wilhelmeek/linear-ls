import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentSyncKind,
  InitializeResult,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { findIssues, getTeamKeys } from "./linear";

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

let supportsConfiguration = false;
let supportsWorkspaceFolder = false;

const teamKeys = new Set<string>();

connection.onInitialize(async (params) => {
  await getTeamKeys().then((keys) => {
    keys.map((k) => {
      teamKeys.add(k);
    });
  });

  const capabilities = params.capabilities;
  const workspace = capabilities.workspace;

  supportsConfiguration = !!workspace?.configuration;
  supportsWorkspaceFolder = !!workspace?.workspaceFolders;

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      codeActionProvider: {},
      completionProvider: {
        resolveProvider: true,
      },
    },
  };

  if (supportsWorkspaceFolder) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }

  return result;
});

connection.onInitialized(() => {
  if (supportsConfiguration) {
    connection.client.register(
      DidChangeConfigurationNotification.type,
      undefined
    );
  }
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
        severity: DiagnosticSeverity.Hint,
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
  return issues.map((issue) => ({
    data: issue,
    detail: issue.description ?? "Not Available",
    insertText: `[${issue.identifier}](${issue.url})`,
    filterText: `${issue.team.key}-${issue.title}`,
    label: `${issue.identifier}: ${issue.title}`,
    kind: CompletionItemKind.Reference,
  }));
});

documents.listen(connection);

connection.listen();
