import { execSync } from "node:child_process"

export function vscodeVersion () {
	try {
		const cmd = execSync("code --version")
		return `^${cmd.split("\n")[0].trim()}`
	} catch {
		return "^1.60.0"
	}
}
