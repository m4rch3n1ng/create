import * as p from "@clack/prompts"
import { doCancel } from "../../options.js"

/**
 * @returns {Promise<import("./svelte.js").Svelte>}
 */
export const mkSvelte = () => (
	p.group(
		{
			tooling: () => (
				p.select({
					message: "what kind of svelte project do you want?",
					initialValue: /** @type {"vite" | "kit"} */ ("kit"),
					options: [
						{ value: "vite", label: "vite" },
						{ value: "kit", label: "kit" }
					]
				})
			),
			scripts: () => (
				p.multiselect({
					message: "what scripts do you want to add?",
					options: [
						{ value: "build", "label": "build" }
					]
				})
			)
		},
		{
			onCancel: doCancel
		}
	)
)
