import * as p from "@clack/prompts"
import { doCancel } from "../options.js"
import { mkElectron } from "./app/electron.js"

/**
 * @returns {Promise<import("./app.js").App>}
 */
export const mkApp = async () => {
	const app = await p.select({
		message: "what framework do you want to use?",
		initialValue: /** @type {"electron"} */ ("electron"),
		options: [
			{ value: "electron", label: "electron" }
		]
	})

	if (p.isCancel(app)) doCancel()

	const appData = await doApp(app)

	return {
		app,
		...appData
	}
}

/**
 * 
 * @param {import("./app.js").App["app"]} framework
 * @returns {Promise<import("./app/electron.d.ts").Electron>}
 */
function doApp ( framework ) {
	switch (framework) {
		case "electron": {
			return mkElectron()
		}
	}
}
