/**
 * @type {import("@m4rch/command").question[]}
 */
export const mkSvelte = [
	{
		name: "tooling",
		type: "select",
		prompt: "what kind of svelte project do you want?",
		select: [ "vite", "kit" ],
		default: "kit"
	},
	{
		name: "scripts",
		type: "multiple",
		prompt: "what scripts do you want to add?",
		select: [ "build" ],
		default: [ "build" ]
	}
]
