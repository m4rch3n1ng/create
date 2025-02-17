import type { make } from "./utils/make.js"
import * as p from "@clack/prompts"
import sortPackage from "@m4rch/sort-package-json"
import deepMerge from "deepmerge"
import { dirname as toDirname, join as joinPath, basename as toBasename } from "node:path"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import { existsSync } from "node:fs"
import { pkg, updateLatest } from "./utils/package.js"
import { info } from "./utils/log.js"
import { $7z } from "./utils/zip.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = toDirname(__filename)
export const templatePath = joinPath(__dirname, "templates")

export async function mk ( make: make, directory: string ) {
	if (!make.template) throw new Error("template is not defined")

	if (!existsSync(directory)) await mkdir(directory)

	info("use", `\"template/${toBasename(make.template)}\"`)
	await $7z([ "x", make.template, "-aoa", `-o${directory}` ])

	const addPackages = []
	for (const add of make.add) {
		info("add", `\"add/${toBasename(add)}\"`)
		await $7z([ "x", add, "-aoa", `-o${directory}` ])

		const tmpPackagePath = joinPath(directory, ".package.json")
		if (existsSync(tmpPackagePath)) {
			const tmpPackage = await readFile(tmpPackagePath)
			const addPackage = JSON.parse(tmpPackage.toString())
			addPackages.push(addPackage)

			await rm(tmpPackagePath)
		}
	}

	return mergePackage(make, addPackages, directory)
}

async function mergePackage ( make: make, addPackages: pkg[], directory: string ) {
	console.log()

	const packagePath = joinPath(directory, "package.json")

	const readPackageContent = await readFile(packagePath)
	const readPackage = JSON.parse(readPackageContent.toString())

	info("removing", "package.json")
	await rm(packagePath)

	info("merging", "package.json")
	const rawPkg = deepMerge(make.package, readPackage)
	const mergePackage = addPackages.reduce(( prevPkg, addPkg ) => deepMerge(prevPkg, addPkg), rawPkg)

	info("updating", "package.json")
	const upPkg = await updateLatest(mergePackage)
	const pkg = sortPackage(upPkg) as pkg

	await writeFile(packagePath, JSON.stringify(pkg, null, "\t") + "\n")
	return !!(pkg.dependencies || pkg.devDependencies)
}

export async function install ( directory: string ) {
	p.intro("installer")

	const installer = await p.select({
		message: "what installer do you want to use?",
		initialValue: /** @type {"npm" | "yarn" | "pnpm"} */ ("npm"),
		options: [
			{ value: "npm", label: "npm" },
			{ value: "yarn", label: "yarn" },
			{ value: "pnpm", label: "pnpm" }
		]
	})

	if (p.isCancel(install) || typeof installer !== "string") {
		p.cancel("cancelling installing")
		return
	}

	p.outro()

	info("using", installer, "\n")

	return new Promise(( resolve, reject ) => {
		const install = spawn(installer, [ "install" ], { stdio: "inherit", cwd: directory, shell: true })

		install.on("error", reject)
		install.on("close", ( code ) => resolve(code))

		install.stderr?.on("data", ( error ) => reject(error.toString()))
	})
}
