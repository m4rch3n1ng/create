import * as impWeb from "./web/index.js"
import * as impPlain from "./plain/index.js"
import * as impMisc from "./misc/index.js"
import * as stuff from "./misc.js"

export const plain = ( files, options ) => {
	if (options.npmignore) {
		files.push({
			name: ".npmignore",
			content: stuff.gitignore
		})
	}

	return impPlain[options.language](files, options)
}

export const misc = ( files, options ) => {
	if (options.project == "vscode-extension") {
		return impMisc.vscode_extension(files, options)
	} else {
		return impMisc[options.project](files, options)
	}
}

export const web = ( files, options ) => impWeb[options.framework](files, options)
