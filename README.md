# linear-ls

Linear Language Server

## Installation

```
npm i -g linear-ls
```

### neovim

If you use `lspconfig`, add the following:

```lua
if not lspconfigconfigs.linear_ls then
  lspconfigconfigs.linear_ls = {
    default_config = {
      cmd = { "linear-ls", "--stdio" },
      filetypes = { "typescript" },
      root_dir = function(fname)
        return lspconfig.util.find_git_ancestor(fname)
      end,
    },
}
end
lspconfig.lls.setup({
  capabilities = capabilities,
})
```

And have your Linear token sourced as `LINEAR_API_KEY`.

## Features

### Hover on Issues

Hovering on ticket identifier shows the ticket description.

<img width="800" alt="image" src="https://user-images.githubusercontent.com/609452/218294991-ef0dfe07-832d-418b-9e7e-8b630f4c2c49.png">

### Issue Completion

Typing team key, hyphen and search term (e.g. `EUC-thing`) triggers issue search. Selecting a result puts in a link to your issue.

<img width="800" alt="image" src="https://user-images.githubusercontent.com/609452/218295062-4a0bbd6c-bb92-44c6-9301-4ab7b1522978.png">

### Create Ticket from Text Selection

Select text in your editor and trigger the code action (e.g., `ga` in Neovim or `Cmd+.` in VS Code) to create a Linear issue. The selected text will be used as the issue title, and it will be replaced with a link to the created ticket in the format `[KEY-123](https://linear.app/...)`.

*Note: The server currently uses the first available team it has access to.*
