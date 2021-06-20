import { status, success, error } from "./utils.js"
import * as core from "./utils.js"
import * as init from "./pre/init.js"
import * as language from "./pre/language.js"
import * as license from "./pre/licenses.js"

export async function create ( dir, options ) {
	let username = await core.username()

	let files = [
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
	]

	files = language[options.language](files, options)

	console.log()
	status("creating files")

	core.writeFiles(files, dir)
	success("files created")

	let pkg = files.find(( file ) => file.name == "package.json").content
	let dependencies = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}))

	if (dependencies.length) {
		console.log()
		status("installing dependencies.")

		core.install(dir)
			.then(() => success("dependencies installed."))
			.catch(( stderr ) => error(decodeURIComponent(stderr).replace(/\r?\n/g, " ")))
	}
}

export default create
