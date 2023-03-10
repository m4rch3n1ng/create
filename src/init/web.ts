import type { answers } from "@m4rch/command"
import { type make, mkAdd, mkTemplate } from "../utils/make.js"

export function initWeb ( make: make, { tooling, scripts, language }: answers ): make {
	const ext = language === "javascript" ? "js" : "ts"
	if (tooling === "vite") {
		make.template = mkTemplate(`svelte.vite.${ext}`)
	} else {
		make.template = mkTemplate(`svelte.kit.${ext}`)
	}

	// todo for loop switch
	if ((scripts as string[]).includes("build")) {
		make.add.push(mkAdd("svelte.kit.scripts.build"))
	}

	return make
}
