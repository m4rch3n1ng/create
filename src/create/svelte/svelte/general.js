module.exports = {
	main: [
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
	].join("\n"),
	app: [
		"<script>",
		"\texport let name",
		"</script>",
		"",
		"<main>",
		"\t<h1>Hello {name}!</h1>",
		"</main>",
		"",
	].join("\n"),
	gitignore: [
		"",
		"# svelte",
		"/dist/build/",
		""
	].join("\n"),
	ts: {
		app: [
			"<script lang=\"ts\">",
			"\texport let name: string",
			"</script>",
			"",
			"<main>",
			"\t<h1>Hello {name}!</h1>",
			"</main>",
			""
		].join("\n"),
	},
}
