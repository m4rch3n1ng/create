import { cyan, magenta } from "kleur/colors"
import { fileURLToPath } from "node:url"
import { join, dirname } from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const __rootname = dirname(__dirname)
export const buildPath = join(__rootname, "build")

export function info ( cmd, ...txt ) {
	console.log(cyan("info"), magenta(cmd), ...txt)
}
