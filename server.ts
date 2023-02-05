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
  CodeActionKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { findIssues } from "./linear";

interface Settings {
  projectPrefixes: Array<string>;
}

const defaultSettings: Settings = { projectPrefixes: [] };
let globalSettings: Settings = defaultSettings;

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const documentSettings: Map<string, Thenable<Settings>> = new Map();

let supportsConfiguration = false;
let supportsWorkspaceFolder = false;

connection.onInitialize((params) => {
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

connection.onDidChangeConfiguration((change) => {
  if (supportsConfiguration) {
    documentSettings.clear();
  } else {
    // TODO: Validate this and send notification if cooked.
    globalSettings = change.settings.lls || defaultSettings;
  }

  documents.all().forEach(identifyTickets);
});

function getDocumentSettings(resource: string): Thenable<Settings> {
  if (!supportsConfiguration) {
    return Promise.resolve(globalSettings);
  }

  let result = documentSettings.get(resource);
  if (!result) {
    result = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: "lls",
    });

    documentSettings.set(resource, result);
  }

  return result;
}

documents.onDidClose((e) => {
  documentSettings.delete(e.document.uri);
});

documents.onDidChangeContent((change) => {
  identifyTickets(change.document);
});

async function identifyTickets(textDocument: TextDocument): Promise<void> {
  const settings = await getDocumentSettings(textDocument.uri);
  if (settings.projectPrefixes.length === 0) {
    return;
  }

  const text = textDocument.getText();
  const diagnostics: Diagnostic[] = [];
  settings.projectPrefixes.forEach((prefix) => {
    Array.from(text.matchAll(new RegExp(`${prefix}-[0-9]*`, "g"))).forEach(
      (m) => {
        diagnostics.push({
          source: "Linear",
          message: m[0],
          severity: DiagnosticSeverity.Hint,
          range: {
            start: textDocument.positionAt(m.index ?? 0),
            end: textDocument.positionAt((m.index ?? 0) + m[0].length),
          },
        });
      }
    );
  });

  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

// TODO: Use text prompt to trigger completion
// TODO: Replace the triggering text with link + ticket number
connection.onCompletion(async (position): Promise<CompletionItem[]> => {
  const settings = await getDocumentSettings(position.textDocument.uri);
  if (settings.projectPrefixes.length === 0) {
    return [];
  }

  connection.console.log("Finding issues");
  const issues = await findIssues(settings.projectPrefixes, "Splash");
  if (issues === undefined) {
    return [];
  }

  return issues.map((issue) => ({
    data: issue,
    detail: issue.description ?? "Not Available",
    insertText: issue.url,
    kind: CompletionItemKind.Reference,
    label: issue.title,
  }));
});

documents.listen(connection);

connection.listen();
