const svelte = require("./svelte/svelte.js")
const svelteKit = require("./svelte/svelte-kit.js")

module.exports = {
	svelte: function ( files, options ) {
		return svelte[options.transpiler](files, options)
	},
	"svelte-kit": svelteKit
}
