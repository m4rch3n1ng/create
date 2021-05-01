let CommandOptions = require("@m4rch/command")

module.exports = class Command extends CommandOptions {
	options =  [
		{
			name: "name",
			type: "input",
			prompt: "what is the name of the project?",
			default: process.argv.slice(2).slice(-1)[0]?.split(/\/|\\\\?/).slice(-1)[0] || process.cwd().split(/\/|\\\\?/).slice(-1)[0]
		},
		{
			name: "license",
			type: "select",
			prompt: "what license do you want?",
			select: [ "mit", "isc", "unlicense" ]
		},
		{
			name: "language",
			type: "select",
			prompt: "what language/framework do you want to use?",
			select: [ "javascript", "typescript", "svelte" ],
			next: {
				javascript: [
					{
						name: "npmignore",
						type: "y/n",
						prompt: "do you want to add a .npmignore file to your project?",
						default: false
					}
				],
				typescript: [
					{
						name: "install",
						type: "y/n",
						prompt: "do you want to install typescript locally?",
						default: false
					},
					{
						name: "npmignore",
						type: "y/n",
						prompt: "do you want to add a .npmignore file to your project?",
						default: false
					}
				],
				svelte: [
					{
						name: "type",
						type: "select",
						prompt: "what kind of svelte project do you want?",
						select: [ "svelte", "sveltekit" ],
						next: {
							svelte: [
								{
									name: "transpiler",
									type: "select",
									prompt: "what do you want to use as a transpiler?",
									select: [ "rollup", "vite" ],
									next: {
										rollup: [
											{
												name: "sirv",
												type: "y/n",
												prompt: "do you want to add the sirv-cli to your dependencies?",
												default: false
											}
										]
									}
								}
							],
							sveltekit: [
								{
									name: "adapter",
									type: "select",
									prompt: "what adapter do you want to have?",
									select: [ "node", "static" ]
								},
								{
									name: "extra",
									type: "multiple",
									prompt: "what extra features do you want to have?",
									submit: "select",
									select: [ "database", "preprocess" ],
									next: {
										database: [
											{
												name: "database",
												type: "select",
												prompt: "what database do you want?",
												select: [ "mongodb", "mysql" ]
											}
										]
									}
								},
								{
									name: "fonts",
									type: "multiple",
									prompt: "what fonts do you want to add?",
									submit: "select",
									select: [ "roboto", "fira-mono", "russo-one" ]
								}
							]
						}
					},
					{
						name: "typescript",
						type: "y/n",
						prompt: "do you want to use typescript in your project?",
						default: false
					}
				]
			}
		}
	]
}
