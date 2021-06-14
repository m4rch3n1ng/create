#!/usr/bin/env node

import command from "@m4rch/command"
import { existsSync, mkdirSync, readdirSync } from "fs"
import { join } from "path"
import { error } from "../src/utils.js"

import options from "./options.js"
import index from "../src/index.js"

let _argv = process.argv.slice(2)
let rootPath = process.cwd()

if (_argv.length) rootPath = join(rootPath, _argv[0])
if (!existsSync(rootPath) || !readdirSync(rootPath).length) {
	command()
		.get(options)
		.action(( answers ) => {
			if (!existsSync(rootPath)) mkdirSync(rootPath, { recursive: true })
			index(answers, rootPath)
		})
		.run()
} else {
	error("can't initiate in a non-empty folder.")
}
