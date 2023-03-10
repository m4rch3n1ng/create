import { mkSvelte } from "./web/svelte.js"

/**
 * @type {import("@m4rch/command").question[]}
 */
export const mkWeb = [
	{
		name: "framework",
		type: "select",
		prompt: "what framework do you want to use?",
		select: [ "svelte" ],
		next: {
			svelte: mkSvelte
		}
	},
	{
		name: "language",
		type: "select",
		prompt: "what language do you want to use?",
		select: [ "javascript", "typescript" ],
		default: "typescript"
		// todo js with tsconfig checkJs noEmit
	},
]
