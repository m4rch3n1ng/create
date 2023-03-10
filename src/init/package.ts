import type { answers } from "@m4rch/command"
import { make, mkTemplate } from "../utils/make.js"

export function initPackage ( make: make, { language }: answers ): make {
	if (language === "typescript") {
		make.template = mkTemplate("package.ts")
	} else {
		make.template = mkTemplate("package.js")
	}

	return make
}
