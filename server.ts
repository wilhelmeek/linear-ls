import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

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

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities;
  const workspace = capabilities.workspace;

  supportsConfiguration = !!workspace?.configuration;
  supportsWorkspaceFolder = !!workspace?.workspaceFolders;

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
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
    globalSettings = <Settings>(change.settings.lls || defaultSettings);
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

connection.onCompletion(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    return [
      {
        label: "MOB-1",
        data: "MOB-1",
        kind: CompletionItemKind.Reference,
      },
    ];
  }
);

connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  if (item.data === "MOB-1") {
    item.detail = "Install the application";
    item.documentation = "Details details";
  }

  return item;
});

documents.listen(connection);

connection.listen();
