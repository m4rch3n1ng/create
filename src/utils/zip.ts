import { path7za } from "7zip-bin"
import { type SpawnOptions, spawn } from "node:child_process"

function genericRun ( command: string, args: string[], opts: SpawnOptions ) {
	const options: SpawnOptions = { stdio: "inherit", ...opts }

	return new Promise(( resolve, reject ) => {
		const child = spawn(command, args, options)

		child.on("error", reject)
		child.on("close", ( code ) => resolve(code))

		child.stderr?.on("data", ( t ) => reject(t.toString()))
	})
}

export async function $7z ( args: string[], op?: SpawnOptions ) {
	await genericRun(path7za, args, { stdio: "ignore", ...op })
}
