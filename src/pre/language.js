import * as init from "./init.js"
import * as impSvelte from "../create/svelte.js"
import tsconfig from "./tsconfig.js"

export function javascript ( files, options ) {
	files = files.concat([
		{
			name: "src",
			files: [
				{
					name: "index.js",
					content: ""
				}
			]
		}
	])

	const pkgIndex = files.findIndex(({ name }) => name == "package.json")
	files[pkgIndex].content.main = "src/index.js"
	files[pkgIndex].content.type = options.type

	if (options.npmignore) {
		files.push({
			name: ".npmignore",
			content: init.gitignore
		})
	}

	return files
}

export function typescript ( files, options ) {
	const pkgIndex = files.findIndex(({ name }) => name == "package.json")

	let pkg = {
		...files[pkgIndex].content,
		main: "dist/index.js",
		scripts: {
			build: "tsc -b",
			dev: "tsc -w",
			watch: "tsc -w"
		},
		devDependencies: {
			"@types/node": "^16.4.12"
		},
		type: "module"
	}

	if (options.install) {
		pkg.devDependencies["typescript"] = "^4.3.5"
	}

	files[pkgIndex].content = pkg

	if (options.npmignore) {
		files.push({
			name: ".npmignore",
			content: init.gitignore + "\n# typescript\n/src/\n"
		})
	}

	const gitignoreIndex = files.findIndex(({ name }) => name == ".gitignore")
	files[gitignoreIndex].content += "\n# typescript\n/dist/\n"

	files = files.concat([
		{
			name: "tsconfig.json",
			content: tsconfig
		},
		{
			name: "src",
			files: [
				{
					name: "index.ts",
					content: ""
				}
			]
		},
		{
			name: "dist",
			files: []
		}
	])

	return files
}

export const svelte = ( files, options ) => impSvelte[options.type](files, options)
