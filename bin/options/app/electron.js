import * as p from "@clack/prompts"
import { doCancel } from "../../options.js"

/**
 * @returns {Promise<import("./electron.js").Electron>}
 */
export const mkElectron = () => (
	p.group(
		{
			framework: () => (
				p.select({
					message: "what framework do you want to use?",
					initialValue: /** @type {"svelte"} */ ("svelte"),
					options: [
						{ value: "svelte", label: "svelte" }
					]
				})
			),
			i18n: () => (
				p.confirm({
					message: "do you want to have i18n?",
					initialValue: false
				})
			)
		},
		{
			onCancel: doCancel
		}
	)
)
