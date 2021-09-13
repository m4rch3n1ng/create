export const index = {
	js: ( identifier, name ) => ([
		"const vscode = require(\"vscode\")",
		"",
		"function activate ( context ) {",
		`\tconsole.log(\"congratulations, your extension \\\"${identifier}\\\" is now active!\")`,
		"",
		"\tcontext.subscriptions.push(",
		`\t\tvscode.commands.registerCommand(\"${identifier}.helloWorld\", () => {`,
		`\t\t\tvscode.window.showInformationMessage(\"Hello World from ${name}!\")`,
		"\t\t})",
		"\t)",
		"}",
		"",
		"function deactivate () {}",
		"",
		"module.exports = {",
		"\tactivate,",
		"\tdeactivate",
		"}",
		""
	].join("\n")),
	ts: ( identifier, name ) => ([
		"import * as vscode from \"vscode\"",
		"",
		"export function activate ( context: vscode.ExtensionContext ) {",
		`\tconsole.log(\"congratulations, your extension \\\"${identifier}\\\" is now active!\")`,
		"",
		"\tcontext.subscriptions.push(",
		`\t\tvscode.commands.registerCommand(\"${identifier}.helloWorld\", () => {`,
		`\t\t\tvscode.window.showInformationMessage(\"Hello World from ${name}!\")`,
		"\t\t})",
		"\t)",
		"}",
		"",
		"export function deactivate () {}",
		""
	].join("\n"))
}

export const vscodeignore = ( typescript, tests, quickstart, eslint ) => ([
	"# default",
	".vscode/",
	".gitignore",
	"",
	typescript ? [
		"# typescript",
		"src/",
		"**/*.ts",
		"**/*.map",
		"**/tsconfig.json",
		"",
	] : [],
	tests ? [
		"# tests",
		".vscode-test/",
		!typescript ? "src/test/" : "dist/test/",
		"",
	] : [],
	quickstart ? [
		"# quickstart",
		"vsc-extension-quickstart.md",
		"",
	] : [],
	eslint ? [
		"# eslint",
		"**/.eslintrc.json",
		""
	] : []
].flat(Infinity).join("\n"))

export const quickstart = ( typescript, tests ) => ([
	"# welcome to your VS Code extension",
	"",
	"## what's in the folder",
	"",
	"- this folder contains all of the files necessary for your extension.",
	"- `package.json` - this is the manifest file in which you declare your extension and command.",
	"\t- the sample plugin registers a command and defines its title and command name. with this information VS Code can show the command in the command palette. it doesn’t yet need to load the plugin.",
	`- \`src/index.${!typescript ? "js" : "ts"}\` - this is the main file where you will provide the implementation of your command.`,
	"\t- the file exports one function, `activate`, which is called the very first time your extension is activated (in this case by executing the command). Inside the `activate` function we call `registerCommand`.",
	"\t- we pass the function containing the implementation of the command as the second parameter to `registerCommand`.",
	"",
	"## get up and running straight away",
	"",
	"- press `F5` to open a new window with your extension loaded.",
	"- run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.",
	`- set breakpoints in your code inside \`src/index.${!typescript ? "js" : "ts"}\` to debug your extension.`,
	"- find output from your extension in the debug console.",
	"",
	"## make changes",
	"",
	`- you can relaunch the extension from the debug toolbar after changing code in \`src/index.${!typescript ? "js" : "ts"}\`.`,
	"- you can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.",
	"",
	"## explore the API",
	"",
	"- you can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.",
	"",
	tests ? [
		"## run tests",
		"",
		"- open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.",
		"- press `F5` to run the tests in a new window with your extension loaded.",
		"- see the output of the test result in the debug console.",
		`- make changes to \`src/test/suite/extension.test.${!typescript ? "js" : "ts"}\` or create new test files inside the \`src/test/suite\` folder.`,
		`\t- the provided test runner will only consider files matching the name pattern \`**.test.${!typescript ? "js" : "ts"}\`.`,
		"\t- you can create folders inside the `test` folder to structure your tests any way you want.",
		"",
	] : [],
	"## go further",
	"",
 	typescript
		? "- reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)."
		: [],
	"- [publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VSCode extension marketplace.",
	"- automate builds by setting up [continuous integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).",
	""
].flat(Infinity).join("\n"))

export const readme = ( name ) => ([
	`# ${name}`,
	"",
	"// TODO",
	"",
	"## release notes",
	"",
	"see the full changelog [here](./changelog.md)",
	""
].join("\n"))

export const launch_json = ( tests ) => ({
	version: "0.2.0",
	configurations: [
		{
			name: "Run Extension",
			type: "extensionHost",
			request: "launch",
			args: [
				"--extensionDevelopmentPath=${workspaceFolder}"
			]
		},
		!tests ? null : {
			"name": "Extension Tests",
			"type": "extensionHost",
			"request": "launch",
			"args": [
				"--extensionDevelopmentPath=${workspaceFolder}",
				"--extensionTestsPath=${workspaceFolder}/test/suite/index"
			]
		}
	].filter(( el ) => el != null)
})

export const tsconfig = ( tests ) => ([
	"{",
	"\t\"compilerOptions\": {",
	"\t\t/* - project options - */",
	"\t\t\"lib\": [",
	"\t\t\t\"es6\"",
	"\t\t],",
	"\t\t\"outDir\": \"dist\",",
	"\t\t\"rootDir\": \"src\",",
	"\t\t\"sourceMap\": true,",
	"\t\t\"target\": \"es6\",",
	"",
	"\t\t/* - strict checks - */",
	"\t\t\"alwaysStrict\": true,",
	"\t\t\"noImplicitAny\": true,",
	"\t\t\"noImplicitThis\": true,",
	"\t\t\"strict\": true,",
	"\t\t\"strictBindCallApply\": true,",
	"\t\t\"strictFunctionTypes\": true,",
	"\t\t\"strictNullChecks\": true,",
	"\t\t\"strictPropertyInitialization\": true,",
	"",
	"\t\t/* - linter checks - */",
	"\t\t\"noFallthroughCasesInSwitch\": true,",
	"\t\t\"noImplicitReturns\": true,",
	"\t\t\"noUncheckedIndexedAccess\": true,",
	"\t\t\"noUnusedLocals\": true,",
	"\t\t\"noUnusedParameters\": true",
	"\t},",
	"\t\"exclude\": [",
	tests ? [
		"\t\t\"node_modules\",",
		"\t\t\".vscode-test\""
	] : "\t\t\"node_modules\"" ,
	"\t]",
	"}",
	""
].flat(Infinity).join("\n"))

// export const tsconfig = {
// 	"compilerOptions": {
// 		"target": "es6",
// 		"outDir": "dist",
// 		"lib": [
// 			"es6"
// 		],
// 		"sourceMap": true,
// 		"rootDir": "src",
// 		"strict": true,
// 		/* Additional Checks */
// 		"noImplicitReturns": true,
// 		"noFallthroughCasesInSwitch": true,
// 		"noUnusedParameters": true,
// 	},
// 	"exclude": [
// 		"node_modules",
// 		".vscode-test"
// 	]
// }
