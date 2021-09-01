#!/usr/bin/env node

import sade from "sade"
import handler from "./handler.js"

sade("create [dir]")
	.version("v0.3.0")
	.describe("quickly create a project template")
	.example("")
	.example("test")
	.action(handler)
	.parse(process.argv)
