const init = require("./init.js")

module.exports = {
	javascript: function ( files, options ) {
		files = files.concat([
			{
				name: "index.js",
				content: ""
			},
			{
				name: "todo",
				content: init.todo
			},
			{
				name: "changelog",
				content: init.changelog()
			}
		])

		if (options.npmignore) {
			let gitignore = files.find(( file ) => file.name == ".gitignore").content
			files.push({
				name: ".npmignore",
				content: gitignore
			})
		}

		return files
	},
	typescript: function ( files, options ) {
		let tsconfig = require("../create/tsconfig.js")

		let pkgIndex = files.findIndex(( file ) => file.name == "package.json")
		let package = files[pkgIndex].content

		package.main = "dist/index.js"
		package.scripts = {
			watch: "tsc -w",
			build: "tsc -b"
		}

		if (options.install) {
			package.devDependencies = {
				typescript: `^4.2.4`
			}
		}

		files[pkgIndex].content = package

		let gitignoreIndex = files.findIndex(( file ) => file.name == ".gitignore")
		files[gitignoreIndex].content += "\n# typescript\n/dist/\n"

		if (options.npmignore) {
			files.push({
				name: ".npmignore",
				content: files[gitignoreIndex].content
			})
		}

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
				name: "changelog",
				content: init.changelog()
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
	},
	svelte: function ( files, options ) {
		let svelte = require("../create/svelte.js")

		return svelte[options.type](files, options)
	}
}
