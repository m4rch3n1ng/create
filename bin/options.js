import * as p from "@clack/prompts"
import { existsSync, readdirSync } from "node:fs"
import { mkPackage } from "./options/package.js"
import { mkWeb } from "./options/web.js"
import { mkApp } from "./options/app.js"

/**
 * @param {{ dirname: string }} options
 * @returns {Promise<import("./options.js").Answers>}
 */
export async function mkOptions ({ dir, dirname }) {
	p.intro("create")

	const files = existsSync(dir) && readdirSync(dir).length
	if (files) {
		const force = await p.confirm({
			message: "directory not empty. continue?",
			initialValue: false
		})

		if (force !== true) {
			doCancel()
		}
	}

	const options = await p.group(
		{
			name: () => (
				p.text({
					message: "what the name of the project?",
					defaultValue: dirname,
					placeholder: dirname,
				})	
			),
			license: () => (
				p.select({
					message: "what license do you want??",
					initialValue: /** @type {"agplv3" | "gplv3" | "mit" | "unlicense"} */ ("agplv3"),
					options: [
						{ value: "agplv3", label: "GNU AGPLv3" },
						{ value: "gplv3", label: "GNU GPLv3" },
						{ value: "mit", label: "MIT" },
						{ value: "unlicense", label: "Unlicense" }
					]
				})
			),
			kind: () => (
				p.select({
					message: "what kind of project do you want?",
					initialValue: /** @type {"package" | "app" | "web"} */ ("package"),
					options: [
						{ value: "package", label: "package" },
						{ value: "app", label: "app" },
						{ value: "web", label: "web" },
					]
				})
			)
		},
		{
			onCancel: doCancel
		}
	)

	const kind = await doKind(options.kind)

	const changelog = await p.confirm({
		message: "do you want to have a changelog?",
		initialValue: true
	})

	if (p.isCancel(changelog)) doCancel()

	p.outro()

	return {
		...options,
		changelog,
		...kind
	}
}

/**
 * @param {import("./options.js").Generic["kind"]} kind
 * @returns {Promise<import("./options/package.d.ts").Package | import("./options/web.d.ts").Web | import("./options/app.d.ts").App>}
 */
function doKind ( kind ) {
	switch (kind) {
		case "package": {
			return mkPackage()
		}
		case "app": {
			return mkApp()
		}
		case "web": {
			return mkWeb()
		}
	}
}

/**
 * @returns {never}
 */
export function doCancel () {
	p.cancel("create cancelled.")
	process.exit(0)
}
