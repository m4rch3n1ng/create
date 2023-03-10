/**
 * @type {import("@m4rch/command").question[]}
 */
export const mkPackage = [
	{
		name: "language",
		type: "select",
		prompt: "what language do you want to use?",
		select: [ "javascript", "typescript" ],
		default: "typescript"
		// todo js with tsconfig checkJs noEmit
	},
	{
		name: "private",
		type: "y/n",
		prompt: "do you want the package to be private?",
		instant: true,
		default: false
	}
]
