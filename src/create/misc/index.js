export function electron () {
	console.log("\x1b[31m >> coming soon! << \x1b[39m")
	process.exit()
}

export { default as vscode_extension } from "./extension.js"
