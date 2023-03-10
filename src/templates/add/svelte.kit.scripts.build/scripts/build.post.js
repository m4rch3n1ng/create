import { italic } from "kleur/colors"
import { copyFile, writeFile } from "node:fs/promises"
import { join as joinPath } from "node:path"
import { __rootname, buildPath, info } from "./_utils.js"
import pkg from "../package.json" assert { type: "json" }

async function main () {
	info("copying", italic("LICENSE"), "to", italic("build/LICENSE"))
	await copyFile(joinPath(__rootname, "LICENSE"), joinPath(buildPath, "LICENSE"))

	await writeFile(joinPath(buildPath, "package.json"), JSON.stringify({
		name: pkg.name,
		version: pkg.version,
		author: pkg.author,
		license: pkg.license,
		main: "./web/index.js",
		scripts: {
			web: "node -r dotenv/config ./web/index.js"
		},
		dependencies: pkg.dependencies,
		type: "module",
		private: true
	}, null, "\t") + "\n")
}

main()
