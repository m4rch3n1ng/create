#!/usr/bin/env node

import sade from "sade"
import { createHandler as handler } from "./handler.js"

sade("create [dir]")
	.version("v0.4.0")
	.describe("quickly create a project template")
	.example("")
	.example("new")
	.action(handler)
	.parse(process.argv)
