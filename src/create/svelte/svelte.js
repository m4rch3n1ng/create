import * as general from "./svelte/general.js"
import * as impRollup from "./svelte/rollup.js"
import * as impVite from "./svelte/vite.js"

export function rollup ( files, options ) {
	const pkgIndex = files.findIndex(( file ) => file.name == "package.json")

	let pkg = {
		...files[pkgIndex].content,
		scripts: {
			dev: "rollup -c -w",
			build: "rollup -c"
		},
		devDependencies: {
			"@rollup/plugin-commonjs": "^19.0.0",
			"@rollup/plugin-node-resolve": "^13.0.0",
			"rollup": "^2.51.1",
			"rollup-plugin-css-only": "^3.1.0",
			"rollup-plugin-livereload": "^2.0.0",
			"rollup-plugin-svelte": "^7.1.0",
			"rollup-plugin-terser": "^7.0.2",
			"svelte": "^3.38.2"
		}
	}

	if (options.typescript) {
		files.push({
			name: "tsconfig.json",
			type: "file",
			content: impRollup.tsconfig
		})
		
		pkg.devDependencies = {
			...pkg.devDependencies,
			"@rollup/plugin-typescript": "^8.2.1",
			"svelte-check": "^2.1.0",
			"svelte-preprocess": "^4.7.3",
			"tslib": "^2.3.0",
			"typescript": "^4.3.2"
		}
	}

	if (options.sirv) {
		pkg.dependencies = {
			"sirv-cli": "^1.0.12"
		}

		pkg.scripts["serve"] = "sirv dist --no-clear"
	}

	files[pkgIndex].content = pkg

	const gitignoreIndex = files.findIndex(({ name }) => name == ".gitignore")
	files[gitignoreIndex].content += impRollup.gitignore

	files = files.concat([
		{
			name: "rollup.config.js",
			content: impRollup.config(options.sirv, options.typescript)
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
					content: !options.typescript ? general.app.js : general.app.ts
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
					content: impRollup.html
				}
			]
		}
	])

	return files
}

export function vite ( files, options ) {
	const pkgIndex = files.findIndex(( file ) => file.name == "package.json")

	let pkg = {
		...files[pkgIndex].content,
		scripts: {
			dev: "vite",
			build: "vite build",
			serve: "vite preview"
		},
		devDependencies: {
			"@sveltejs/vite-plugin-svelte": "next",
			"svelte": "^3.38.2",
			"vite": "^2.3.7"
		}
	}

	if (options.typescript) {
		files = files.concat([
			{
				name: "svelte.config.js",
				content: impVite.svelteConfig
			},
			{
				name: "tsconfig.json",
				content: impVite.tsconfig
			}
		])

		pkg.devDependencies = {
			...pkg.devDependencies,
			"svelte-preprocess": "^4.7.3",
			"typescript": "^4.3.2",
		}
	}

	files[pkgIndex].content = pkg

	const gitignoreIndex = files.findIndex(( file ) => file.name == ".gitignore")
	files[gitignoreIndex].content += impVite.gitignore

	files = files.concat([
		{
			name: "vite.config.js",
			content: impVite.config
		},
		{
			name: "index.html",
			content: impVite.html(options.typescript)
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
					content: !options.typescript ? general.app.js : general.app.ts
				}
			]
		}
	])

	return files
}
