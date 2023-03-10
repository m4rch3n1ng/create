import { join as joinPath } from "node:path"
import { exec } from "node:child_process"
import type { pkg } from "./package.js"
import { templatePath } from "../make.js"
import { warn } from "./log.js"

export interface make {
	template: string | null,
	add: string[],
	package: pkg
}

export function mkTemplate ( template: string ) {
	return joinPath(templatePath, "template", `${template}.7z`)
}

export function mkAdd ( add: string ) {
	return joinPath(templatePath, "add", `${add}.7z`)
}

export function getUsername (): Promise<string> {
	return new Promise(( resolve ) => {
		exec("npm whoami", ( err, stdout: string, stderr ) => {
			if (!stderr && !err) {
				resolve(stdout.trim())
			} else {
				console.log()
				warn("couldn't get npm username")
				resolve("")
			}
		})
	})
}
