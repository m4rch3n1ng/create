export const app = [
	"<script>",
	"\texport let name",
	"</script>",
	"",
	"",
	"<h1>Hello {name}!</h1>",
	"",
].join("\n")

export const main = [
	"import App from \"./main.svelte\"",
	"",
	"const app = new App({",
	"\ttarget: document.body,",
	"\tprops: {",
	"\t\tname: \"world\"",
	"\t}",
	"})",
	"",
	"export default app",
	"",
].join("\n")

export const todo = [
	"[ content ]",
	"[ ui ]",
	"[ bugs ]",
	"[ misc ]",
	""
].join("\n")

export const ts = {
	app: [
		"<script lang=\"ts\">",
		"\texport let name: string",
		"</script>",
		"",
		"",
		"<h1>Hello {name}!</h1>",
		""
	].join("\n")
}
