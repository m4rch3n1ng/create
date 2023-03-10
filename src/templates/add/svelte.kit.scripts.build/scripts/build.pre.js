import { italic } from "kleur/colors"
import { rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import { buildPath, info } from "./_utils.js"

async function main () {
	if (existsSync(buildPath)) {
		info("removing", italic("build/"))
		await rm(buildPath, { recursive: true })
	}
}

main()
