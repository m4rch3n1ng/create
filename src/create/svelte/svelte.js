const rollup = require("./svelte/rollup.js")
const vite = require("./svelte/vite.js")
const general = require("./svelte/general.js")

module.exports = {
	rollup: function ( files, options ) {
		let pkgIndex = files.findIndex(( file ) => file.name == "package.json")
		let pkg = files[pkgIndex].content

		pkg.scripts = {
			dev: "rollup -c -w",
			build: "rollup -c"
		}

		pkg.devDependencies = {
			"@rollup/plugin-commonjs": "^19.0.0",
			"@rollup/plugin-node-resolve": "^13.0.0",
			"rollup": "^2.48.0",
			"rollup-plugin-css-only": "^3.1.0",
			"rollup-plugin-livereload": "^2.0.0",
			"rollup-plugin-svelte": "^7.1.0",
			"rollup-plugin-terser": "^7.0.2",
			"svelte": "^3.38.2"
		}

		if (options.typescript) {
			pkg.devDependencies = {
				...pkg.devDependencies,
				"@rollup/plugin-typescript": "^8.2.1",
				"svelte-check": "^1.5.4",
				"svelte-preprocess": "^4.7.3",
				"tslib": "^2.2.0",
				"typescript": "^4.2.4"
			}
		}

		if (options.sirv) {
			pkg.dependencies = {
				"sirv-cli": "^1.0.11"
			}

			pkg.scripts["start"] = "sirv dist --no-clear"
		}

		files[pkgIndex].content = pkg

		let gitignoreIndex = files.findIndex(( file ) => file.name == ".gitignore")
		files[gitignoreIndex].content += rollup.gitignore

		files = files.concat([
			{
				name: "rollup.config.js",
				content: rollup.config(options.sirv, options.typescript)
			},
			{
				name: "todo",
				content: general.todo
			},
			{
				name: "changelog",
				content: general.changelog()
			},
			{
				name: "src",
				files: [
					{
						name: !options.typescript ? "main.js" : "main.ts",
						content: general.main
					},
					{
						name: "main.svelte",
						content: !options.typescript ? general.app : general.ts.app
					}
				]
			},
			{
				name: "dist",
				type: "folder",
				files: [
					{
						name: "index.html",
						type: "file",
						content: rollup.html
					}
				]
			}
		])

		if (options.typescript) {
			files.push({
				name: "tsconfig.json",
				type: "file",
				content: rollup.tsconfig
			})
		}

		return files
	},
	vite: function ( files, options ) {
		let pkgIndex = files.findIndex(( file ) => file.name == "package.json")
		let pkg = files[pkgIndex].content

		pkg.scripts = {
			dev: "vite",
			build: "vite build",
			serve: "vite preview"
		}

		pkg.devDependencies = {
			"@sveltejs/vite-plugin-svelte": "next",
			"svelte": "^3.38.2",
			"vite": "^2.3.1"
		}

		if (options.typescript) {
			pkg.devDependencies = {
				...pkg.devDependencies,
				"svelte-preprocess": "^4.7.3",
				"typescript": "^4.2.4",
			}
		}

		files[pkgIndex].content = pkg

		let gitignoreIndex = files.findIndex(( file ) => file.name == ".gitignore")
		files[gitignoreIndex].content += vite.gitignore

		files = files.concat([
			{
				name: "vite.config.js",
				content: vite.config
			},
			{
				name: "index.html",
				content: vite.html(options.typescript)
			},
			{
				name: "todo",
				content: general.todo
			},
			{
				name: "changelog",
				content: general.changelog()
			},
			{
				name: "src",
				files: [
					{
						name: !options.typescript ? "main.js" : "main.ts",
						content: general.main
					},
					{
						name: "main.svelte",
						content: !options.typescript ? general.app : general.ts.app
					}
				]
			}
		])

		if (options.typescript) {
			files = files.concat([
				{
					name: "svelte.config.js",
					content: vite.svelte
				},
				{
					name: "tsconfig.json",
					content: vite.tsconfig
				}
			])
		}

		return files
	}
}
