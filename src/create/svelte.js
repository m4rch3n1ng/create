import * as impSvelte from "./svelte/svelte.js"

export const svelte = ( files, options ) => impSvelte[options.transpiler](files, options)

export { default as sveltekit } from "./svelte/sveltekit.js"
