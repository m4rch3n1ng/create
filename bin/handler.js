import command from "@m4rch/command"
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { error } from "../src/utils.js"
import { createQuestions } from "./options.js"
import { create } from "../src/index.js"

export function createHandler ( path ) {
	const dir = path || "."

	if (existsSync(dir) && readdirSync(dir).length) return error("can't initiate in a non-empty folder.")

	command(createQuestions(join(process.cwd(), dir)))
		.action(create.bind(null, dir))
		.run()
}
