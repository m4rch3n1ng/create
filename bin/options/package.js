import * as p from "@clack/prompts"
import { doCancel } from "../options.js"

/**
 * @returns {Promise<import("./package.js").Package>}
 */
export const mkPackage = () => (
	p.group(
		{
			language: () => (
				p.select({
					message: "what language do you want to use?",
					initialValue: /** @type {"js" | "ts"} */ ("ts"),
					options: [
						{ value: "js", label: "javascript" },
						{ value: "jsdoc", label: "javascript w/ jsdoc" },
						{ value: "ts", label: "typescript" },
					]
				})
			),
			private: () => (
				p.confirm({
					message: "do you want the package to be private?",
					initialValue: false
				})
			)
		},
		{
			onCancel: doCancel
		}
	)
)
