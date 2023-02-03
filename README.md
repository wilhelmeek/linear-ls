# lls

Linear Language Server

## Installation

```
npm i -g linear-ls
```

## Configuration

### neovim

```lua
if not lspconfigconfigs.lls then
	lspconfigconfigs.lls = {
		default_config = {
			cmd = { "linear-ls", "--stdio" },
			filetypes = { "*" },
			root_dir = function(fname)
				return lspconfig.util.find_git_ancestor(fname)
			end,
			settings = {},
		},
	}
end
lspconfig.lls.setup({
	capabilities = capabilities,
	settings = {
		lls = {
			projectPrefixes = { "MOB" },
		},
	},
})
```

### Visual Studio Code

Someone please make a client 🙏
