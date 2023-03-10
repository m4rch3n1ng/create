import type { answers } from "@m4rch/command"
import { make, mkAdd } from "./utils/make.js"
import { defaultPackage } from "./utils/package.js"
import { type anyLicense, mkLicense } from "./utils/license.js"
import { getUsername } from "./utils/make.js"
/* init */
import { initPackage } from "./init/package.js"
import { initApp } from "./init/app.js"
import { initWeb } from "./init/web.js"

export async function init ( answers: answers ): Promise<make> {
	const { kind, license: licenseName, changelog } = answers

	const username = await getUsername()
	const license = mkLicense(licenseName as anyLicense)

	const make: make = {
		package: defaultPackage({ username, license: license.name }, answers),
		template: null,
		add: [ license.add ],
	}

	if (changelog) {
		make.add.push(mkAdd("changelog.md"))
	}

	switch (kind) {
		case "package": return initPackage(make, answers)
		case "app": return initApp(make, answers)
		case "web": return initWeb(make, answers)
		default: return make
	}
}
