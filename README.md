# linear-ls

A Language Server for [Linear](https://linear.app/).

`linear-ls` integrates your Linear issues directly into your editor, providing context, quick actions, and status updates.

## Installation

```bash
npm i -g linear-ls
```

## Configuration

The server requires your Linear API key to function. Set the `LINEAR_API_KEY` environment variable in your shell or editor configuration.

### Neovim

```lua
vim.lsp.config("linear-ls", {
  cmd = { "linear-ls", "--stdio" },
  filetypes = { "typescript" },
})

vim.lsp.enable({
  "linear-ls",
})
```

Otherwise, if using lspconfig:

```lua
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.linear_ls then
  configs.linear_ls = {
    default_config = {
      cmd = { "linear-ls", "--stdio" },
      filetypes = { "markdown", "typescript", "javascript", "go", "text" },
      root_dir = lspconfig.util.root_pattern('.git'),
      settings = {},
    },
  }
end

lspconfig.linear_ls.setup({})
```

## Features

### Hover Details

Hover over any Linear issue key (e.g., `ENG-123`) in your code or comments to see its description.

### Autocompletion

Search for issues directly while typing. Type your team key followed by a hyphen and a search term (e.g., `ENG-log`) to trigger a search. Selecting a result inserts a Markdown-formatted link to the issue: `[ENG-123](https://linear.app/...)`.

### Status Diagnostics

The language server checks the status of issues referenced in your documents. Completed, Canceled, or Archived issues are highlighted with an informational diagnostic, helping you identify outdated references.

### Create Ticket from Selection

Select any text in your document and trigger your editor's "Code Actions" (e.g., `Cmd+.` or `leader + ca`). Choose _Create Ticket from Selection_ to create a new Linear issue using the selected text as the title, and automatically replace the text with a Markdown link to the new issue.

### Open in Linear

Place your cursor on an existing issue key (e.g., `ENG-123`) and trigger "Code Actions". Choose _Open ENG-123 in Linear_ to open the ticket directly in your default web browser.
