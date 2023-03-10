#!/usr/bin/node

import { createServer, build, createLogger } from "vite"
import electronPath from "electron"
import { spawn } from "node:child_process"

const mode = process.env.MODE = process.env.MODE || "development"

const sharedConfig = {
	mode,
	build: {
		watch: {}
	},
	logLevel: "info"
}

const getWatcher = ({ name, configFile, writeBundle }) => (
	build({
		...sharedConfig,
		configFile,
		plugins: [{ name, writeBundle }]
	})
)

function setupMainPackageWatcher ( viteDevServer ) {
	// write a value to an environment variable to pass it to the main process.
	{
		const protocol = `http${viteDevServer.config.server.https ? "s" : ""}:`
		const host = viteDevServer.config.server.host || "localhost"
		const port = viteDevServer.config.server.port
		const path = "/"
		process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}${path}`
	}

	const logger = createLogger("info", {
		prefix: "[main]"
	})

	let spawnProcess = null
	return getWatcher({
		name: "reload-app-on-main-package-change",
		configFile: "packages/main/vite.config.ts",
		writeBundle() {
			if (spawnProcess !== null) {
				spawnProcess.kill("SIGINT")
				spawnProcess = null
			}

			spawnProcess = spawn(String(electronPath), [ "." ]);

			spawnProcess.stdout.on("data", ( d ) => d.toString().trim() && logger.warn(d.toString().trim(), { timestamp: true }))
			spawnProcess.stderr.on("data", ( d ) => {
				const data = d.toString().trim()
				if (!data) return

				logger.error(data, { timestamp: true })
			})
		}
	})
}

const setupPreloadPackageWatcher = ( viteDevServer ) => (
	getWatcher({
		name: "reload-page-on-preload-package-change",
		configFile: "packages/preload/vite.config.ts",
		writeBundle() {
			viteDevServer.ws.send({
				type: "full-reload"
			})
		}
	})
)

async function main () {
	try {
		const viteDevServer = await createServer({
			...sharedConfig,
			configFile: "packages/renderer/vite.config.mts"
		})

		await viteDevServer.listen()

		await setupPreloadPackageWatcher(viteDevServer)
		await setupMainPackageWatcher(viteDevServer)
	} catch ( err ) {
		console.error(err)
		process.exit(1)
	}
}

main()
