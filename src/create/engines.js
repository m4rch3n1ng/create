import * as impWeb from "./web/index.js"
import * as impPlain from "./plain/index.js"
import * as misc from "./misc.js"

export const plain = ( files, options ) => {
	if (options.npmignore) {
		files.push({
			name: ".npmignore",
			content: misc.gitignore
		})
	}

	return impPlain[options.language](files, options)
}

export const web = ( files, options ) => impWeb[options.framework](files, options)
