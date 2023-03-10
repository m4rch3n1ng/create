import { mkAdd } from "./make.js"

export type anyLicense = "MIT" | "GNU AGPLv3" | "GNU GPLv3" | "Unlicense"

const licenseNames = {
	"MIT": "MIT",
	"GNU AGPLv3": "AGPL-3.0-only",
	"GNU GPLv3": "GPL-3.0-only",
	"Unlicense": "Unlicense"
}

const licensePaths = {
	"MIT": "license.mit",
	"GNU AGPLv3": "license.agplv3",
	"GNU GPLv3": "license.gplv3",
	"Unlicense": "license.unlicense"
}

export function mkLicense ( license: anyLicense ) {
	const licensePath = licensePaths[license]

	return {
		name: licenseNames[license],
		add: mkAdd(licensePath)
	}
}
