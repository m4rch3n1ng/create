import { status, success, error } from "./functions.js"
import * as core from "./functions.js"
import * as init from "./pre/init.js"
import * as language from "./pre/language.js"
import * as license from "./create/licenses.js"

export async function create ( options, rootPath ) {
	let username = await core.username()
	let files = []

	files = files.concat([
		{
			name: "package.json",
			content: init.pkg(options.name, options.license, username)
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
			.catch(( stderr ) => error(decodeURIComponent(stderr).replace(/\r?\n/g, " ")))
	}
}

export default create
