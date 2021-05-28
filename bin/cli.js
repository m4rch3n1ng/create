#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync } from "fs"
import { join } from "path"
import { error } from "../src/functions.js"

import { default as Command } from "../src/command.js"
import { default as index } from "../src/index.js"

let _argv = process.argv.slice(2)
let rootPath = process.cwd()

if (_argv.length) rootPath = join(rootPath, _argv[0])
if (!existsSync(rootPath) || !readdirSync(rootPath).length) {
	let command = new Command

	command
		.get()
		.then(( answers ) => {
			if (!existsSync(rootPath)) mkdirSync(rootPath, { recursive: true })
			index(answers, rootPath)
		})
} else {
	error("can't initiate in a non-empty folder.")
}
