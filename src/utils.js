import sortPackage from "@m4rch/sort-package-json"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import { exec } from "child_process"
import { join } from "path"

export function username () {
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

export function writeFiles ( files, dir ) {
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

	files.forEach(( file ) => {
		if (typeof file.content != "undefined") {
			let content = typeof file.content == "object" ? JSON.stringify(file.content, null, "\t") + "\n" : file.content.toString()
			if (file.name == "package.json") content = sortPackage(content)

			console.log(`  \x1b[35mcreate\x1b[0m ${join(dir, file.name)}`)

			writeFileSync(join(dir, file.name), content)
		} else if (file.children) {
			mkdirSync(join(dir, file.name), { recursive: true })
			writeFiles(file.children, join(dir, file.name))
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
