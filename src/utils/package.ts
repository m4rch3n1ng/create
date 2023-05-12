import type { Answers } from "../../bin/options.js"
import ncu from "@m4rch/npm-check-updates"

export interface pkg {
	name: string
	description: string
	version: string
	license: string
	keywords?: string[]
	author: string
	private: boolean
	type: "module" | "commonjs",
	main?: string

	scripts?: {[ script: string ]: string }
	bin?: string | {[ bin: string ]: string }

	dependencies?: {[ dependency: string ]: string }
	devDependencies?: {[ dependency: string ]: string }
}

export async function updateLatest ( pkg: pkg ): Promise<pkg> {
	const toUp = await ncu(pkg, { semver: true })

	for (const { name, from, new: n } of toUp) {
		pkg[from]![name] = n
	}

	return pkg
}

export const defaultPackage = ({ license, username }: { license: string, username: string }, { name, ...answers }: Answers ): pkg => ({
	name: name,
	description: "",
	version: "0.1.0",
	author: username,
	license: license,
	private: "private" in answers && answers.private === false ? false : true,
	type: "module"
})
