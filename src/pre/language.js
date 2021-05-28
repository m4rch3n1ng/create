import * as init from "./init.js"
import * as impSvelte from "../create/svelte.js"
import { default as tsconfig } from "./tsconfig.js"

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
		},
		{
			name: "todo",
			content: init.todo
		}
	])

	let pkgIndex = files.findIndex(( file ) => file.name == "package.json")
	files[pkgIndex].content.type = options.type

	if (options.npmignore) {
		let gitignore = files.find(( file ) => file.name == ".gitignore").content

		files.push({
			name: ".npmignore",
			content: gitignore
		})
	}

	return files
}

export function typescript ( files, options ) {
	let pkgIndex = files.findIndex(( file ) => file.name == "package.json")
	let pkg = files[pkgIndex].content

	pkg.main = "dist/index.js"
	pkg.scripts = {
		build: "tsc -b",
		dev: "tsc -w",
		watch: "tsc -w"
	}

	pkg.devDependencies = {
		"@types/node": "^15.6.1"
	}

	if (options.install) {
		pkg.devDependencies["typescript"] = "^4.3.2"
	}

	pkg.type = "module"

	files[pkgIndex].content = pkg

	if (options.npmignore) {
		files.push({
			name: ".npmignore",
			content: init.gitignore + "\n# typescript\n/src/\n"
		})
	}

	let gitignoreIndex = files.findIndex(( file ) => file.name == ".gitignore")
	files[gitignoreIndex].content += "\n# typescript\n/dist/\n"

	files = files.concat([
		{
			name: "tsconfig.json",
			content: tsconfig
		},
		{
			name: "todo",
			content: init.todo
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

export function svelte ( files, options ) {
	return impSvelte[options.type](files, options)
}
