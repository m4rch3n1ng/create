const svelteKit = require("./sveltekit/general.js")
const withDep = [ "database" ]

module.exports = function ( files, options ) {
	let packageIndex = files.findIndex(( file ) => file.name == "package.json")
	let package = files[packageIndex].content

	package.scripts = {
		dev: "svelte-kit dev",
		build: "svelte-kit build",
		start: "svelte-kit start"
	}

	package.devDependencies = {}

	package.devDependencies[`@sveltejs/adapter-${options.adapter}`] = "next"

	package.devDependencies = {
		...package.devDependencies,
		"@sveltejs/kit": "next",
		"svelte": "^3.29.0",
		"vite": "^2.1.0"
	}

	if (options.typescript) {
		package.devDependencies = {
			...package.devDependencies,
			"svelte-preprocess": "^4.6.9",
			"typescript": "^4.2.3",
		}
	}

	delete package.main

	if (options.extra.some(( extra ) => withDep.includes(extra)) || options.fonts.length) package.dependencies = {}

	package.type = "module"

	files[packageIndex].content = package

	let gitignoreIndex = files.findIndex(( file ) => file.name == ".gitignore")
	files[gitignoreIndex].content += svelteKit.gitignore

	files = files.concat([
		{
			name: "svelte.config.cjs",
			content: svelteKit.config(options.typescript, options.adapter, options.extra)
		},
		{
			name: "todo",
			content: svelteKit.todo
		},
		{
			name: "changelog",
			content: svelteKit.changelog()
		},
		{
			name: "src",
			files: [
				{
					name: "app.css",
					content: svelteKit.css(options.fonts)
				},
				{
					name: "app.html",
					content: svelteKit.app
				},
				{
					name: "routes",
					files: [
						{
							name: "$layout.svelte",
							content: svelteKit.$layout(options.typescript)
						},
						{
							name: "index.svelte",
							content: svelteKit.index(options.typescript)
						}
					]
				},
				{
					name: "lib",
					files: [
						{
							name: "header.svelte",
							content: ""
						}
					]
				}
			]
		},
		{
			name: "static",
			files: [
				{
					name: "robots.txt",
					content: svelteKit.robots
				}
			]
		}
	])

	if (options.typescript) {
		let srcIndex = files.findIndex(( file ) => file.name == "src")

		files[srcIndex].files.push({
			name: "global.d.ts",
			content: svelteKit.ts.global
		})

		files.push({
			name: "tsconfig.json",
			content: svelteKit.ts.tsconfig
		})
	}

	if (options.extra.length) {
		let srcIndex = files.findIndex(( file ) => file.name == "src")
		let srcLibIndex = files[srcIndex].files.findIndex(( file ) => file.name == "lib")
		let packageIndex = files.findIndex(( file ) => file.name == "package.json")

		options.extra.forEach(( extra ) => {
			switch (extra) {
				case "database": {
					switch (options.database) {
						case "mongodb": {
							files[packageIndex].content.dependencies["mongodb"] = "^3.6.6"

							files[srcIndex].files[srcLibIndex].files.push({
								name: "mongodb.js",
								content: svelteKit.extra.mongodb
							})

							break
						}
						case "mysql": {
							files[packageIndex].content.dependencies["mysql"] = "^2.18.1"

							files[srcIndex].files[srcLibIndex].files.push({
								name: "mysql.js",
								content: svelteKit.extra.mysql
							})

							break
						}
					}

					break
				}
				case "preprocess": {
					if (!options.typescript) {
						files[packageIndex].content.devDependencies["svelte-preprocess"] = "^4.6.9"
					}
				}
				case "fonts": {
					options.fonts.forEach(( font ) => {
						files[packageIndex].content.dependencies[`@fontsource/${font}`] = "latest"
					})
				}
			}
		})
	}

	return files
}
