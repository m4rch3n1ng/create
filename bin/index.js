#!/usr/bin/env node

import sade from "sade"
import { handler } from "./handler.js"

sade("create [dir]")
	.version("v0.5.0")
	.describe("quickly create a project template")
	.example("")
	.example("new")
	.action(handler)
	.parse(process.argv)

export { handler }
export default handler
