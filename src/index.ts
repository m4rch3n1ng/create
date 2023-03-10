import type { answers } from "@m4rch/command"
import { magenta } from "kleur/colors"
import { join as joinPath } from "node:path"
import { init } from "./init.js"
import { install, mk } from "./make.js"
import { info } from "./utils/log.js"

export default async function main ( dirName: string, answers: answers ): Promise<void> {
	const directory = joinPath(process.cwd(), dirName)
	const make = await init(answers)

	console.log()
	info("creating project in", magenta(dirName), "\n")
	const doInstall = await mk(make, directory, dirName)

	if (doInstall) {
		console.log()
		await install(directory)
	}

	console.log()
}
