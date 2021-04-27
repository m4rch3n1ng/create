const svelteKit = require("./svelte-kit/general.js")

module.exports = function ( files, options ) {
	let packageIndex = files.findIndex(( file ) => file.name == "package.json")
	let package = files[packageIndex].content

	package.scripts = {
		dev: "svelte-kit dev",
		build: "svelte-kit build",
		start: "svelte-kit start"
	}

	package.devDependencies = {
		"@sveltejs/adapter-node": "next",
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

	package.type = "module"

	files[packageIndex].content = package

	let gitignoreIndex = files.findIndex(( file ) => file.name == ".gitignore")
	files[gitignoreIndex].content += svelteKit.gitignore

	files = files.concat([
		{
			name: "svelte.config.cjs",
			content: svelteKit.config(options.typescript, options.extra)
		},
		{
			name: "src",
			files: [
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
				},
				{
					name: "app.css",
					content: svelteKit.css
				},
				{
					name: "app.html",
					content: svelteKit.app
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

	return files
}
