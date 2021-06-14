import { mkdirSync, writeFileSync } from "fs"
import { exec } from "child_process"
import { join } from "path"

export async function username () {
	return new Promise(( resolve ) => {
		exec("npm whoami", ( err, stdout, stderr ) => {
			if (!stderr && !err) {
				resolve(stdout.trim())
			} else {
				console.log()
				warn("couldn't get npm username.")
				resolve(null)
			}
		})
	})
}

export function install ( cwd ) {
	return new Promise(( resolve, reject ) => {
		exec("npm install", { cwd }, ( err, _stdout, stderr ) => {
			if (!stderr && !err) {
				resolve()
			} else {
				reject(stderr)
			}
		})
	})
}

export function writeFiles ( files, rootPath ) {
	files.forEach(( file ) => {
		if (file.content != null) {
			let content = typeof file.content == "object" ? JSON.stringify(file.content, null, "\t") + "\n" : file.content.toString()
			writeFileSync(join(rootPath, file.name), content)
		} else if (file.files) {
			mkdirSync(join(rootPath, file.name), { recursive: true })
			writeFiles(file.files, join(rootPath, file.name))
		}
	})
}

export function status ( text ) {
	console.log(`m4\x1b[36m!notice\x1b[39m ${text}`)
}

export function success ( text ) {
	console.log(`m4\x1b[32m!success\x1b[39m ${text}`)
}

export function warn ( text ) {
	console.log(`m4\x1b[33m!warn\x1b[39m ${text}`)
}

export function error ( text ) {
	console.log(`m4\x1b[31m!error\x1b[39m ${text}`)
}
