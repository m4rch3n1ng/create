#!/usr/bin/node

import electron from "electron"
import { writeFile, readFile } from "node:fs/promises"
import { execSync } from "node:child_process"


function getVendors () {
	const output = execSync(`${electron} -p "JSON.stringify(process.versions)"`, {
		env: { "ELECTRON_RUN_AS_NODE": "1" },
		encoding: "utf-8"
	})

	return JSON.parse(output)
}

async function main () {
	const { v8 } = getVendors()
	const chromeMajorVersion = v8.split(".").splice(0, 2).join("")

	const pkg = JSON.parse(( await readFile("./package.json") ).toString())
	pkg.browserslist = [ `Chrome ${chromeMajorVersion}` ]

	await writeFile("./package.json", JSON.stringify(pkg, null, "\t") + "\n")
}

main().catch(( err ) => {
	console.error(err)
	process.exit(1)
})
