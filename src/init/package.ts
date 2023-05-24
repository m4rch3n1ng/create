import type { AnswerPkg } from "../../bin/options.js"
import { make, mkTemplate } from "../utils/make.js"

export function initPackage ( make: make, answers: AnswerPkg ): make {
	if (answers.language === "ts") {
		make.template = mkTemplate("package.ts")
	} else if (answers.language === "jsdoc") {
		make.template = mkTemplate("package.jsdoc")
	} else {
		make.template = mkTemplate("package.js")
	}

	return make
}
