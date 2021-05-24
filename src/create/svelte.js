import * as importSvelte from "./svelte/svelte.js"

export const svelte = ( files, options ) => importSvelte[options.transpiler](files, options)

export { default as sveltekit } from "./svelte/sveltekit.js"
