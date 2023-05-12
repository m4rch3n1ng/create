import type { AnswerApp } from "../../bin/options.js"
import { make, mkAdd, mkTemplate } from "../utils/make.js"

export function initApp ( make: make, answers: AnswerApp ): make {
	if (answers.app === "electron") {
		return initElectron(make, answers)
	} else {
		return make
	}
}

function initElectron ( make: make, { framework, i18n }: AnswerApp ): make {
	const ext = "ts"

	if (i18n) {
		make.add.push(mkAdd(`electron.i18n.${ext}`))
	}

	make.template = mkTemplate(`electron.${framework}.${ext}`)
	return make
}
