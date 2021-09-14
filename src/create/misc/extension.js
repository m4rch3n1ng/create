import { vscodeVersion } from "./extension/utils.js"
import * as general from "./extension/general.js"
import * as test from "./extension/test.js"

export default function extension ( files, options ) {
	const { identifier } = options

	const pkgIndex = files.findIndex(({ name }) => name == "package.json")
	let pkg = {
		...files[pkgIndex].content,
		name: identifier,
		displayName: options.name,
		version: "0.1.0",
		description: "",
		categories: [
			"Other"
		],
		main: !options.typescript ? "src/index.js" : "dist/index.js",
		contributes: {
			commands: [
				{
					command: `${identifier}.helloWorld`,
					title: "Hello World"
				}
			]
		},
		activationEvents: [
			`onCommand:${identifier}.helloWorld`
		],
		engines: {
			vscode: vscodeVersion() || "^1.6.0"
		}
	}

	files = files.concat([
		{
			name: ".vscode",
			children: [
				{
					name: "launch.json",
					content: general.launch_json(options.tests)
				}
			]
		},
		{
			name: "src",
			children: [
				{
					name: !options.typescript ? "index.js" : "index.ts",
					content: !options.typescript
						? general.index.js(identifier, options.name)
						: general.index.ts(identifier, options.name)
				}
			]
		},
		{
			name: ".vscodeignore",
			content: general.vscodeignore(options.typescript, options.tests)
		},
		{
			name: "readme.md",
			content: general.readme(options.name)
		}
	])

	if (options.typescript) {
		files.push({
			name: "tsconfig.json",
			content: general.tsconfig(options.tests)
		})

		pkg.scripts = {
			...pkg.scripts,
			dev: "tsc -wp",
			build: "tsc -p",
			watch: "tsc -wp"
		}

		pkg.devDependencies = {
			...pkg.devDependencies,
			"@types/vscode": "^1.60.0",
			"@types/node": "^16.9.1",
			typescript: "^4.4.3"
		}
	}

	if (options.tests) {
		const srcIndex = files.findIndex(({ name }) => name == "src")

		files[srcIndex].children.push({
			name: "test",
			children: [
				{
					name: "suite",
					children: [
						{
							name: !options.typescript ? "index.js" : "index.ts",
							content: !options.typescript ? test.index.js : test.index.ts
						},
						{
							name: !options.typescript ? "index.test.js" : "index.test.ts",
							content: !options.typescript? test.index.test.js : test.index.test.ts
						}
					]
				},
				{
					name: !options.typescript ? "runTest.js" : "runTest.ts",
					content: !options.typescript ? test.runTest.js : test.runTest.ts
				}
			]
		})
	}

	files[pkgIndex].content = pkg

	if (options.quickstart) {
		files.push({
			name: "vsc-extension-quickstart.md",
			content: general.quickstart(options.typescript, options.tests)
		})
	}

	return files
}
