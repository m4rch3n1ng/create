/**
 * @type {import("@m4rch/command").question[]}
 */
export const mkApp = [
	{
		name: "app",
		type: "select",
		prompt: "what kind of app do you want to have?",
		select: [ "electron" ],
		next: {
			electron: [
				{
					name: "framework",
					type: "select",
					prompt: "what framework do you want to use?",
					select: [ "svelte" ],
					default: "svelte"
				},
				{
					name: "i18n",
					type: "y/n",
					prompt: "do you want to have i18n",
					instant: true
				}
			]
		}
	},
]
