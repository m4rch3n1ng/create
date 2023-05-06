import ncu from "@m4rch/npm-check-updates"
import spj from "@m4rch/sort-package-json"
import { green, magenta, red } from "kleur/colors"
import { readFile, readdir, writeFile } from "node:fs/promises"
import { join as joinPath } from "node:path"
import { info, warn } from "../dist/utils/log.js"

async function main () {
	const dirs = await readdir("src/templates/template")

	for (const dir of dirs) {
		const packageFile = joinPath("src", "templates", "template", dir, "package.json")
		await checkOne(packageFile, dir)
	}

	console.log()
}

async function checkOne ( packageFile, dir ) {
	const packageContent = await readFile(packageFile)
	const pkg = JSON.parse(packageContent.toString())

	console.log()
	info("checking", `src/templates/template/${magenta(dir)}/package.json`)

	if (!pkg.dependencies && !pkg.devDependencies) {
		info("no dependencies found")
		await writeFile(packageFile, JSON.stringify(pkg, null, "\t")+ "\n")
		return
	}

	const minor = await ncu(pkg, { semver: true })
	if (minor.length) {
		info("updating", minor.length, minor.length === 1 ? "dependency" : "dependencies")
		minor.forEach(({ from, name, old, new: n }) => {
			console.log("    ",  green(`${name}:`), old, "→", n)
			pkg[from][name] = n
		})
	} else {
		info("no minor updates available")
	}

	const major = await ncu(pkg, { semver: false })
	if (major.length) {
		warn("major updates available:", major.length)
		major.forEach(({ name, old, new: n }) => console.log("    ", red(`${name}:`), old, "→", n))
	} else {
		info("no major updates available")
	}

	const sortedPkg = spj(pkg, { stringify: false })
	await writeFile(packageFile, JSON.stringify(sortedPkg, null, "\t")+ "\n")
}

main()
