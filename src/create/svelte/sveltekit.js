import * as svelteKit from "./sveltekit/general.js"
import * as templates from "./sveltekit/templates.js"
const withDep = [ "database" ]

export default function sveltekit ( files, options ) {
	let pkgIndex = files.findIndex(( file ) => file.name == "package.json")
	let pkg = files[pkgIndex].content

	pkg.scripts = {
		dev: "svelte-kit dev",
		build: "svelte-kit build --verbose",
		preview: "svelte-kit preview"
	}

	pkg.devDependencies = {
		[`@sveltejs/adapter-${options.adapter}`]: "next",
		"@sveltejs/kit": "next",
		"svelte": "^3.38.2"
	}

	if (options.typescript) {
		pkg.devDependencies = {
			...pkg.devDependencies,
			"svelte-preprocess": "^4.7.3",
			"typescript": "^4.3.2"
		}
	}

	delete pkg.main

	if (options.extra.some(( extra ) => withDep.includes(extra)) || options.fonts.length) pkg.dependencies = {}

	options.fonts.forEach(( font ) => {
		pkg.dependencies[`@fontsource/${font}`] = "^4.4.5"
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
		let srcLibIndex = files[srcIndex].files.findIndex(( file ) => file.name == "lib")
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
				case "message": {
					files[srcIndex].files[srcLibIndex].files.push({
						name: "message.svelte",
						content: templates.message.svelte
					},
					{
						name: "message.js",
						content: templates.message.js
					})
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
							files[pkg].content.dependencies["mongodb"] = "^3.6.9"

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
						files[pkg].content.devDependencies["svelte-preprocess"] = "^4.7.3"
					}
				}
			}
		})
	}

	return files
}
