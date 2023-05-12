import * as process from "node:process"
import { basename as toBasename, join as joinPath } from "node:path"
import { stdin } from "node:process"
import { mkOptions } from "./options.js"
import main from "../dist/index.js"

export async function handler ( dir = "." ) {
	const dirname = toBasename(joinPath(process.cwd(), dir))
	const answers = await mkOptions({ dirname })

	await main(dir, answers)

	stdin?.destroy()
}
