import { mkdir, readdir } from "node:fs/promises"
import { join as joinPath } from "node:path"
import { $7z } from "../dist/utils/zip.js"
import { info } from "../dist/utils/log.js"

async function main () {
	const distTemplates = joinPath("dist", "templates")

	await mkdir(distTemplates)
	await mkdir(joinPath(distTemplates, "add"))
	await mkdir(joinPath(distTemplates, "template"))

	const srcTemplates = joinPath("src", "templates")

	const addTemplates = await readdir(joinPath(srcTemplates, "add"))
	const mainTemplates = await readdir(joinPath(srcTemplates, "template"))

	for (const addTemplate of addTemplates) {
		const zipPath = `${joinPath(distTemplates, "add", addTemplate)}.7z`
		const thingPath = `${joinPath(srcTemplates, "add", addTemplate)}/.`

		info("zipping", `\"${joinPath("add", addTemplate)}.7z\"`)
		await $7z([ "a", zipPath, "-w", thingPath ])
	}

	for (const mainTemplate of mainTemplates) {
		const zipPath = `${joinPath(distTemplates, "template", mainTemplate)}.7z`
		const thingPath = `${joinPath(srcTemplates, "template", mainTemplate)}/.`

		info("zipping", `\"${joinPath("template", mainTemplate)}.7z\"`)
		await $7z([ "a", zipPath, "-w", thingPath ])
	}
}

main()
