#!/usr/bin/env node

import sade from "sade"
import { handler } from "./handler.js"

sade("create [dir]")
	.version("v1.1.3")
	.describe("quickly create a project template")
	.example("")
	.example("new")
	.action(handler)
	.parse(process.argv)

export { handler }
export default handler
