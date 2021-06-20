import command from "@m4rch/command"
import { existsSync, readdirSync } from "fs"
import { join } from "path"
import { error } from "../src/utils.js"

import options from "./options.js"
import index from "../src/index.js"

export default function handler ( path ) {
	let dir = join(process.cwd(), path || ".")

	if (existsSync(dir) && readdirSync(dir).length) return error("can't initiate in a non-empty folder.")

	command(options(dir))
		.action(index.bind(null, dir))
		.run()
}
