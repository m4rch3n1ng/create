const { status, success, err } = require("./functions.js")
const core = require("./functions.js")
const init = require("./pre/init.js")
const language = require("./pre/language.js")
const license = require("./create/licenses.js")

module.exports = async function ( options, rootPath ) {
	let username = await core.username()
	let files = []

	files = files.concat([
		{
			name: "package.json",
			content: init.package(options.name, options.license, username)
		},
		{
			name: "LICENSE",
			content: license[options.license](username)
		},
		{
			name: ".gitignore",
			content: init.gitignore
		}
	])

	files = language[options.language](files, options)

	console.log()
	status("creating files.")

	core.writeFiles(files, rootPath)
	success("files created.")

	let pkg = files.find(( file ) => file.name == "package.json").content
	let dependencies = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}))

	if (dependencies.length) {
		console.log()
		status("installing dependencies.")

		core.install(rootPath)
		.then(() => success("dependencies installed."))
		.catch(( stderr ) => err(decodeURIComponent(stderr).replace(/\r?\n/g, " ")))
	}
}
