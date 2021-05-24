import { exec } from "child_process"
import * as fs from "fs"
import * as path from "path"

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

export function install ( dir ) {
	return new Promise(( resolve, reject ) => {
		exec("npm install", { cwd: dir }, ( err, stdout, stderr ) => {
			if (!stderr && !err) {
				resolve()
			} else {
				reject(stderr)
			}
		})
	})
}

export function writeFiles ( files, rootPath ) {
	function write ( files, rootPath ) {
		files.forEach(( file ) => {

			if (file.content != null) {
				let content = typeof file.content == "object" ? JSON.stringify(file.content, null, "\t") + "\n" : file.content.toString()
				fs.writeFileSync(path.join(rootPath, file.name), content)
			} else if (file.files) {
				fs.mkdirSync(path.join(rootPath, file.name), { recursive: true })
				write(file.files, path.join(rootPath, file.name))
			}

		})
	}
	write(files, rootPath)
}

export function status ( text ) {
	console.log(`m4\x1b[36m!notice\x1b[0m ${text}`)
}

export function success ( text ) {
	console.log(`m4\x1b[32m!success\x1b[0m ${text}`)
}

export function warn ( text ) {
	console.log(`m4\x1b[33m!warn\x1b[0m ${text}`)
}

export function error ( text ) {
	console.log(`m4\x1b[31m!error\x1b[0m ${text}`)
}
