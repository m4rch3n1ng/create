import { status, success, error } from "./utils.js"
import * as utils from "./utils.js"
import init from "./create/init.js"

export async function create ( dir, options ) {
	const files = await init(options)

	console.log()
	status("creating files")

	utils.writeFiles(files, dir)
	success("files created")

	const pkg = files.find(({ name }) => name == "package.json").content
	const dependencies = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}))

	if (dependencies.length) {
		console.log()
		status("installing dependencies")

		utils.install(dir)
			.then(() => success("dependencies installed"))
			.catch(( stderr ) => error(decodeURIComponent(stderr).replace(/\r?\n/g, " ")))
	}
}
