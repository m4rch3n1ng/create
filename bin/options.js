export const createQuestions = ( dir ) => ([
	{
		name: "name",
		type: "input",
		prompt: "what's the name of the project?",
		default: dir.split(/[\/\\]/).filter(( el ) => el.length).pop()
	},
	{
		name: "license",
		type: "select",
		prompt: "what license do you want?",
		select: [ "mit", "isc", "unlicense" ]
	},
	{
		name: "kind",
		type: "select",
		prompt: "what kind of project do you want?",
		select: [ "plain", "misc", "web" ],
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
			misc: [
				{
					name: "project",
					type: "select",
					prompt: "what project do you want?",
					select: [ "electron", "vscode-extension" ],
					next: {
						"vscode-extension": [
							{
								name: "identifier",
								type: "input",
								prompt: "what's the identifier of your extension?",
								default: dir.split(/[\/\\]/).filter(( el ) => el.length).pop(),
								validate: /^[a-z0-9][a-z0-9\-]*$/i
							},
							{
								name: "typescript",
								type: "y/n",
								prompt: "do you want to use typescript?",
								default: false,
								instant: true
							},
							{
								name: "tests",
								type: "y/n",
								prompt: "do you want to have a test runner included?",
								default: true,
								instant: true
							},
							{
								name: "quickstart",
								type: "y/n",
								prompt: "do you need a quickstart guide?",
								default: false,
								instant: true
							}
						]
					}
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
										select: [ "database", "preprocess", "scripts" ],
										next: {
											database: [
												{
													name: "database",
													type: "select",
													prompt: "what database do you want?",
													select: [ "mongodb", "mysql" ]
												}
											],
											scripts: [
												{
													name: "scripts",
													type: "multiple",
													prompt: "what scripts do you want to add?",
													select: [ "build" ],
													default: [ "build" ],
													next: {
														build: [
															{
																name: "build.zip",
																type: "y/n",
																prompt: "do you want to zip the built files?",
																instant: true,
																default: true,
																next: {
																	true: [
																		{
																			name: "build.7z",
																			type: "y/n",
																			prompt: "do you also want to zip add to a .7z file?",
																			instant: true,
																			default: false
																		}
																	]
																}
															},
															{
																name: "build.install",
																type: "y/n",
																prompt: "do you want to install the dependencies in the build directory?",
																instant: true,
																default: true
															},
															{
																name: "build.extractLicenses",
																type: "y/n",
																prompt: "do you want to extract all licenses into a LICENSES.md file?",
																instant: true,
																default: false
															}
														]
													}
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
		default: true
	}
])
