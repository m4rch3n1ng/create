#!/usr/bin/node
import { build } from "vite"
import { dirname } from "node:path"

const mode = process.env.MODE = process.env.MODE || "production"

const packagesConfigs = [
	"packages/main/vite.config.ts",
	"packages/preload/vite.config.ts",
	"packages/renderer/vite.config.mts"
]

async function main () {
	try {
		console.time("total bundling time")

		for (const packageConfigPath of packagesConfigs) {
			console.group(`${dirname(packageConfigPath)}/`)
			console.time("bundling time")

			await build({ configFile: packageConfigPath, mode })

			console.timeEnd("bundling time")
			console.groupEnd()
			console.log("\n")
		}

		console.timeEnd("total bundling time")
	} catch ( err ) {
		console.error(err)
		process.exit(1)
	}
}

main()
