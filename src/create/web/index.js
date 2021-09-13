import * as impSvelte from "./svelte.js"

export const svelte = ( files, options ) => impSvelte[options.type](files, options)
