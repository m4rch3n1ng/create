import * as general from "./sveltekit/general.js"
import * as extra from "./sveltekit/extra.js"
import * as templates from "./sveltekit/templates.js"
import * as typescript from "./sveltekit/typescript.js"
const withDep = [ "database" ]

export default function sveltekit ( files, options ) {
	const pkgIndex = files.findIndex(({ name }) => name == "package.json")

	let pkg = {
		...files[pkgIndex].content,
		scripts: {
			dev: "svelte-kit dev",
			build: "svelte-kit build --verbose",
			preview: "svelte-kit preview"
		},
		devDependencies: {
			[`@sveltejs/adapter-${options.adapter}`]: "next",
			"@sveltejs/kit": "next",
			"svelte": "^3.38.2"
		},
		type: "module"
	}

	if (options.typescript) {
		pkg.devDependencies = {
			...pkg.devDependencies,
			"svelte-preprocess": "^4.7.3",
			"typescript": "^4.3.2"
		}
	}

	if (options.extra.some(( extra ) => withDep.includes(extra)) || options.fonts.length) pkg.dependencies = {}

	options.fonts.forEach(( font ) => {
		pkg.dependencies[`@fontsource/${font}`] = "^4.4.5"
	})

	files[pkgIndex].content = pkg

	const gitignoreIndex = files.findIndex(({ name }) => name == ".gitignore")
	files[gitignoreIndex].content += general.gitignore

	files = files.concat([
		{
			name: "svelte.config.js",
			content: general.config(options.typescript, options.adapter, options.extra)
		},
		{
			name: "src",
			files: [
				{
					name: "app.css",
					content: general.css(options.fonts)
				},
				{
					name: "app.html",
					content: general.app
				},
				{
					name: "routes",
					files: [
						{
							name: "__layout.svelte",
							content: general.__layout(options.typescript)
						},
						{
							name: "index.svelte",
							content: general.index(options.typescript)
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
					content: general.robots
				}
			]
		}
	])

	if (options.typescript) {
		const srcIndex = files.findIndex(({ name }) => name == "src")

		files[srcIndex].files.push({
			name: "global.d.ts",
			content: typescript.global
		})

		files.push({
			name: "tsconfig.json",
			content: typescript.tsconfig
		})
	}

	if (options.templates.length) {
		const srcIndex = files.findIndex(({ name }) => name == "src")
		const srcLibIndex = files[srcIndex].files.findIndex(({ name }) => name == "lib")
		const srcRoutesIndex = files[srcIndex].files.findIndex(({ name }) => name == "routes")

		options.templates.forEach(( template ) => {
			switch (template) {
				case "__error": {
					files[srcIndex].files[srcRoutesIndex].files.push({
						name: "__error.svelte",
						content: templates.__error(options.typescript)
					})
					break
				}
				case "message": {
					files[srcIndex].files[srcLibIndex].files.push({
						name: "message.svelte",
						content: templates.message.svelte(options.typescript)
					},
					{
						name: !options.typescript ? "message.js" : "message.ts",
						content: !options.typescript ? templates.message.js : templates.message.ts
					})
				}
			}
		})
	}

	if (options.extra.length) {
		const srcIndex = files.findIndex(({ name }) => name == "src")
		const srcLibIndex = files[srcIndex].files.findIndex(({ name }) => name == "lib")
		const pkg = files.findIndex(({ name }) => name == "package.json")

		options.extra.forEach(( ex ) => {
			switch (ex) {
				case "database": {
					switch (options.database) {
						case "mongodb": {
							files[pkg].content.dependencies.mongodb = "^3.6.9"

							files[srcIndex].files[srcLibIndex].files.push({
								name: !options.typescript ? "mongodb.js" : "mongodb.ts",
								content: !options.typescript ? extra.mongodb.js : extra.mongodb.ts
							})

							if (options.typescript) files[pkg].content.devDependencies["@types/mongodb"] = "^3.6.18"
							break
						}
						case "mysql": {
							files[pkg].content.dependencies.mysql = "^2.18.1"

							files[srcIndex].files[srcLibIndex].files.push({
								name: !options.typescript ? "mysql.js" : "mysql.ts",
								content: !options.typescript ? extra.mysql.js : extra.mysql.ts
							})

							if (options.typescript) files[pkg].content.devDependencies["@types/mysql"] = "^2.15.18"
							break
						}
					}
					break
				}
				case "preprocess": {
					if (!options.typescript) {
						files[pkg].content.devDependencies["svelte-preprocess"] = "^4.7.3"
					}
					break
				}
			}
		})
	}

	return files
}
