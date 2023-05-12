import type { AnswerWeb } from "../../bin/options.js"
import { type make, mkAdd, mkTemplate } from "../utils/make.js"

export function initWeb ( make: make, { tooling, scripts, language }: AnswerWeb ): make {
	if (tooling === "vite") {
		make.template = mkTemplate(`svelte.vite.${language}`)
	} else {
		make.template = mkTemplate(`svelte.kit.${language}`)
	}

	// todo for loop switch
	if (scripts.includes("build")) {
		make.add.push(mkAdd("svelte.kit.scripts.build"))
	}

	return make
}
