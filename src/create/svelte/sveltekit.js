const svelteKit = require("./sveltekit/general.js")
const templates = require("./sveltekit/templates.js")
const withDep = [ "database" ]

module.exports = function ( files, options ) {
	let pkgIndex = files.findIndex(( file ) => file.name == "package.json")
	let pkg = files[pkgIndex].content

	pkg.scripts = {
		dev: "svelte-kit dev",
		build: "svelte-kit build",
		start: "svelte-kit start"
	}

	pkg.devDependencies = {}

	pkg.devDependencies[`@sveltejs/adapter-${options.adapter}`] = "next"

	pkg.devDependencies = {
		...pkg.devDependencies,
		"@sveltejs/kit": "next",
		"svelte": "^3.29.0"
	}

	if (options.typescript) {
		pkg.devDependencies = {
			...pkg.devDependencies,
			"svelte-preprocess": "^4.7.3",
			"typescript": "^4.2.4",
		}
	}

	delete pkg.main

	if (options.extra.some(( extra ) => withDep.includes(extra)) || options.fonts.length) pkg.dependencies = {}

	options.fonts.forEach(( font ) => {
		pkg.dependencies[`@fontsource/${font}`] = "^4.2.0"
	})

	pkg.type = "module"

	files[pkgIndex].content = pkg

	let gitignoreIndex = files.findIndex(( file ) => file.name == ".gitignore")
	files[gitignoreIndex].content += svelteKit.gitignore

	files = files.concat([
		{
			name: "svelte.config.js",
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
							name: "__layout.svelte",
							content: svelteKit.__layout(options.typescript)
						},
						{
							name: "index.svelte",
							content: svelteKit.index(options.typescript)
						}
					]
				},
				{
					name: "lib",
					files: []
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

	if (options.templates.length) {
		let srcIndex = files.findIndex(( file ) => file.name == "src")
		let srcRoutesIndex = files[srcIndex].files.findIndex(( file ) => file.name == "routes")

		options.templates.forEach(( template ) => {
			switch (template) {
				case "__error": {
					files[srcIndex].files[srcRoutesIndex].files.push({
						name: "__error.svelte",
						content: templates.__error
					})
					break
				}
			}
		})
	}

	if (options.extra.length) {
		let srcIndex = files.findIndex(( file ) => file.name == "src")
		let srcLibIndex = files[srcIndex].files.findIndex(( file ) => file.name == "lib")
		let pkg = files.findIndex(( file ) => file.name == "package.json")

		options.extra.forEach(( extra ) => {
			switch (extra) {
				case "database": {
					switch (options.database) {
						case "mongodb": {
							files[pkg].content.dependencies["mongodb"] = "^3.6.6"

							files[srcIndex].files[srcLibIndex].files.push({
								name: "mongodb.js",
								content: svelteKit.extra.mongodb
							})

							break
						}
						case "mysql": {
							files[pkg].content.dependencies["mysql"] = "^2.18.1"

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
						files[pkg].content.devDependencies["svelte-preprocess"] = "^4.7.4"
					}
				}
			}
		})
	}

	return files
}
