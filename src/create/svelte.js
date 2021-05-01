const svelte = require("./svelte/svelte.js")
const svelteKit = require("./svelte/sveltekit.js")

module.exports = {
	svelte: ( files, options ) => svelte[options.transpiler](files, options),
	sveltekit: svelteKit
}
