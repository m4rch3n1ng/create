import { mkPackage } from "./options/package.js"
import { mkWeb } from "./options/web.js"
import { mkApp } from "./options/app.js"

/**
 * @param dirname {{ dirname: string }}
 * @returns {import("@m4rch/command").question[]}
 */
export const mkOptions = ({ dirname }) => ([
	{
		name: "name",
		type: "input",
		prompt: "what's the name of the project?",
		default: dirname
	},
	{
		name: "license",
		type: "select",
		prompt: "what license do you want?",
		select: [ "GNU AGPLv3", "GNU GPLv3", "MIT", "Unlicense" ]
	},
	{
		name: "kind",
		type: "select",
		prompt: "what kind of project do you want?",
		select: [ "package", "app", "web" ],
		next: {
			package: mkPackage,
			app: mkApp,
			web: mkWeb
		}
	},
	{
		name: "changelog",
		type: "y/n",
		prompt: "do you want to have a changelog?",
		default: true,
		instant: true
	}
])
