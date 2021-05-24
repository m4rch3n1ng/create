#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { error } from "../src/functions.js"

import Command from "../src/command.js"
import index from "../src/index.js"

let _argv = process.argv.slice(2)
let rootPath = process.cwd()

if (_argv.length) rootPath = path.join(rootPath, _argv[0])
if (!fs.existsSync(rootPath) || !fs.readdirSync(rootPath).length) {
	let command = new Command

	command.get()
		.then(( answers ) => {
			if (!fs.existsSync(rootPath)) fs.mkdirSync(rootPath, { recursive: true })
			index(answers, rootPath)
		})
} else {
	error("can't initiate in a non-empty folder.")
}
