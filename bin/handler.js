import command from "@m4rch/command"
import { existsSync, readdirSync } from "fs"
import { error } from "../src/utils.js"

import { createQuestions } from "./options.js"
import { create } from "../src/index.js"

export function createHandler ( path ) {
	const dir = path || "."

	if (existsSync(dir) && readdirSync(dir).length) return error("can't initiate in a non-empty folder.")

	command(createQuestions(dir))
		.action(create.bind(null, dir))
		.run()
}
