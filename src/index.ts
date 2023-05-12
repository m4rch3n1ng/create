import type { Answers } from "../bin/options.js"
import { magenta } from "kleur/colors"
import { join as joinPath } from "node:path"
import { init } from "./init.js"
import { install, mk } from "./make.js"
import { info } from "./utils/log.js"

export default async function main ( dirName: string, answers: Answers ): Promise<void> {
	const directory = joinPath(process.cwd(), dirName)
	const make = await init(answers)

	info("creating project in", magenta(dirName), "\n")
	const doInstall = await mk(make, directory)

	if (doInstall) {
		console.log()
		await install(directory)
	}

	console.log()
}
