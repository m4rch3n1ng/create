import type { answers } from "@m4rch/command"
import { make, mkAdd, mkTemplate } from "../utils/make.js"

export function initApp ( make: make, { app, ...answers }: answers ): make {
	if (app === "electron") {
		return initElectron(make, answers)
	} else {
		return make
	}
}

function initElectron ( make: make, { framework, i18n }: answers ): make {
	const ext = "ts"

	if (i18n) {
		make.add.push(mkAdd(`electron.i18n.${ext}`))
	}

	make.template = mkTemplate(`electron.${framework}.${ext}`)
	return make
}
