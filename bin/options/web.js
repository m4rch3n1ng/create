import * as p from "@clack/prompts"
import { doCancel } from "../options.js"
import { mkSvelte } from "./web/svelte.js"

/**
 * @returns {Promise<import("./web.js").Web>}
 */
export async function mkWeb () {
	const framework = await p.select({
		message: "what framework do you want to use?",
		initialValue: /** @type {"svelte"} */ ("svelte"),
		options: [
			{ value: "svelte", label: "svelte" }
		]
	})

	if (p.isCancel(framework)) doCancel()

	const frameworkData = await doFramework(framework)

	const language = await p.select({
		message: "what language do you want to use?",
		initialValue: /** @type {"js" | "ts"} */ ("ts"),
		options: [
			{ value: "js", label: "javascript" },
			{ value: "ts", label: "typescript" },
		]
	})

	if (p.isCancel(language)) doCancel()

	return {
		framework,
		language,
		...frameworkData
	}
}

/**
 * @param {import("./web.js").Web["framework"]} framework
 * @returns {Promise<import("./web/svelte.d.ts").Svelte>}
 */
function doFramework ( framework ) {
	switch (framework) {
		case "svelte": {
			return mkSvelte()
		}
	}
}
