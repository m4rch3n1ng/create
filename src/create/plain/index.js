import tsconfig from "./tsconfig.js"

export function javascript ( files, options ) {
	files.push({
		name: "src",
		children: [
			{
				name: "index.js",
				content: ""
			}
		]
	})

	const pkgIndex = files.findIndex(({ name }) => name == "package.json")
	files[pkgIndex].content.main = "src/index.js"
	files[pkgIndex].content.type = options.type

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
			"@types/node": "^16.9.1"
		},
		type: "module"
	}

	if (options.install) {
		pkg.devDependencies["typescript"] = "^4.4.3"
	}

	files[pkgIndex].content = pkg

	const gitignoreIndex = files.findIndex(({ name }) => name == ".gitignore")
	files[gitignoreIndex].content += "\n# typescript\n/dist/\n"

	files = files.concat([
		{
			name: "tsconfig.json",
			content: tsconfig
		},
		{
			name: "src",
			children: [
				{
					name: "index.ts",
					content: ""
				}
			]
		},
		{
			name: "dist",
			children: []
		}
	])

	return files
}
