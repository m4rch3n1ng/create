import { existsSync } from "node:fs"
import { rm } from "node:fs/promises"

async function main () {
	if (existsSync("dist")) await rm("dist", { recursive: true })
}

main()
