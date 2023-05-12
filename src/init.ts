import type { AnswerApp, AnswerPkg, AnswerWeb, Answers } from "../bin/options.js"
import { make, mkAdd } from "./utils/make.js"
import { defaultPackage } from "./utils/package.js"
import { mkLicense } from "./utils/license.js"
import { getUsername } from "./utils/make.js"
/* init */
import { initPackage } from "./init/package.js"
import { initApp } from "./init/app.js"
import { initWeb } from "./init/web.js"

export async function init ( answers: Answers ): Promise<make> {
	const { kind, license: licenseName, changelog } = answers

	const username = await getUsername()
	const license = mkLicense(licenseName)

	const make: make = {
		package: defaultPackage({ username, license: license.name }, answers),
		template: null,
		add: [ license.add ],
	}

	if (changelog) {
		make.add.push(mkAdd("changelog.md"))
	}

	switch (kind) {
		case "package": return initPackage(make, answers as AnswerPkg)
		case "app": return initApp(make, answers as AnswerApp)
		case "web": return initWeb(make, answers as AnswerWeb)
		default: return make
	}
}
