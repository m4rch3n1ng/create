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
		"",
		"<h1>Hello {name}!</h1>",
		"",
	].join("\n"),
	todo: [
		"[ content ]",
		"[ ui ]",
		"[ bugs ]",
		"[ misc ]",
		""
	].join("\n"),
	changelog: () => [
		`( v ${new Date().toISOString().split("T")[0]} )`,
		"[ content ]",
		"[ ui ]",
		"[ fixes ]",
		"[ misc ]",
		""
	].join("\n"),
	ts: {
		app: [
			"<script lang=\"ts\">",
			"\texport let name: string",
			"</script>",
			"",
			"",
			"<h1>Hello {name}!</h1>",
			""
		].join("\n"),
	}
}
