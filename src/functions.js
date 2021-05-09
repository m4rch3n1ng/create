const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")

async function username () {
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

function install ( dir ) {
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

function writeFiles ( files, rootPath ) {
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

function status ( text ) {
	console.log(`\x1b[47mm4!status\x1b[0m ${text}`)
}

function success ( text ) {
	console.log(`\x1b[42mm4!success\x1b[0m ${text}`)
}

function warn ( text ) {
	console.log(`\x1b[43mm4!warn\x1b[0m ${text}`)
}

function err ( text ) {
	console.log(`\x1b[41mm4!err\x1b[0m ${text}`)
}

module.exports = {
	username,
	install,
	writeFiles,
	status,
	success,
	warn,
	err
}
