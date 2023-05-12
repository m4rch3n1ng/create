import type { Answers } from "../../bin/options.js"
import { mkAdd } from "./make.js"

const licenseNames = {
	"mit": "MIT",
	"agplv3": "AGPL-3.0-only",
	"gplv3": "GPL-3.0-only",
	"unlicense": "Unlicense"
}

const licensePaths = {
	"mit": "license.mit",
	"agplv3": "license.agplv3",
	"gplv3": "license.gplv3",
	"unlicense": "license.unlicense"
}

export function mkLicense ( license: Answers["license"] ) {
	const licensePath = licensePaths[license]

	return {
		name: licenseNames[license],
		add: mkAdd(licensePath)
	}
}
