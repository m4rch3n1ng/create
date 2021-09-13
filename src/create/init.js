import * as kind from "./kind.js"
import * as misc from "./misc.js"
import * as licenses from "./licenses.js"
import * as utils from "../utils.js"

export default async function init ( options ) {
	const username = await utils.username()

	const files = [
		{
			name: "package.json",
			content: misc.pkg(options.name, options.license, username)
		},
		{
			name: "LICENSE",
			content: licenses[options.license](username)
		},
		{
			name: ".gitignore",
			content: misc.gitignore
		}
	]

	if (options.changelog) {
		files.push({
			name: "changelog.md",
			content: misc.changelog
		})
	}

	return kind[options.kind](files, options)
}
