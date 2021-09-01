export default ( dir ) => ([
	{
		name: "name",
		type: "input",
		prompt: "what is the name of the project?",
		default: dir.split(/[\/\\]/).filter(( el ) => el.length).pop()
	},
	{
		name: "license",
		type: "select",
		prompt: "what license do you want?",
		select: [ "mit", "isc", "unlicense" ]
	},
	{
		name: "engine",
		type: "select",
		prompt: "what type of project do you want?",
		select: [ "plain", "web" ],
		next: {
			plain: [
				{
					name: "language",
					type: "select",
					prompt: "what language do you want to use?",
					select: [ "javascript", "typescript" ],
					next: {
						typescript: [
							{
								name: "install",
								type: "y/n",
								prompt: "do you want to install typescript locally?",
								instant: true,
								default: false
							}
						],
						javascript: [
							{
								name: "type",
								type: "select",
								prompt: "what type do you want your project to be?",
								select: [ "commonjs", "module" ],
								default: "module"
							}
						]
					}
				},
				{
					name: "npmignore",
					type: "y/n",
					prompt: "do you want to add a .npmignore file to your project?",
					instant: true,
					default: false
				}
			],
			web: [
				{
					name: "framework",
					type: "select",
					prompt: "what framework do you want to use?",
					select: [ "svelte" ],
					next: [
						{
							name: "type",
							type: "select",
							prompt: "what kind of svelte project do you want?",
							select: [ "svelte", "sveltekit" ],
							default: "sveltekit",
							next: {
								svelte: [
									{
										name: "transpiler",
										type: "select",
										prompt: "what do you want to use as a transpiler?",
										select: [ "rollup", "vite" ]
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
										name: "templates",
										type: "multiple",
										prompt: "which of these templates do you want in your project?",
										select: [ "__error", "message" ]
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
										select: [ "roboto", "fira-mono", "russo-one" ],
										default: [ "roboto", "fira-mono" ]
									}
								]
							}
						},
						{
							name: "typescript",
							type: "y/n",
							prompt: "do you want to use typescript in your project?",
							instant: true,
							default: false
						}
					]
				}
			]
		}
	},
	{
		name: "changelog",
		type: "y/n",
		prompt: "do you want to have a changelog?",
		instant: true,
		default: false
	}
])
