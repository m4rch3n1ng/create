export const __layout = ( typescript ) => [
	`<script${typescript ? " lang=\"ts\"" : ""}>`,
	"\timport \"../app.css\"",
	"</script>",
	"",
	"",
	"<slot />",
	""
].join("\n")

export const app = [
	"<!DOCTYPE html>",
	"<html lang=\"en\">",
	"<head>",
	"\t<meta charset=\"utf-8\" />",
	"\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />",
	"\t<meta name=\"HandheldFriendly\" content=\"true\">",
	"\t<meta name=\"MobileOptimized\" content=\"20\">",
	"",
	"\t%svelte.head%",
	"</head>",
	"<body>",
	"\t%svelte.body%",
	"</body>",
	"</html>",
	""
].join("\n")

export const css = ( fonts ) => [
	fonts && fonts.length ? fonts.map(( font ) => {
		if (font == "roboto") {
			return [
				"@import \"@fontsource/roboto\";",
				"@import \"@fontsource/roboto/700.css\";"
			]
		} else {
			return `@import "@fontsource/${font}";`
		}
	}).concat([ "" ]) : null,
	":root {",
	`\tfont-family: ${fonts && fonts.includes("roboto") ? "Roboto, " : ""}-apple-system, Arial, sans-serif;`,
	"}",
	"",
	"* {",
	"\tmargin: 0;",
	"}",
	"",
	"*:focus {",
	"\toutline: none;",
	"}",
	fonts && fonts.includes("roboto") ? [
		"",
		"h1, h2, h3, h4, h5, h6 {",
		"\tfont-weight: 700;",
		"}"
	] : null,
	""
].flat(Infinity).filter(( line ) => line != null).join("\n")

export const config = ( typescript, adapter, extra ) => [
	`import ${adapter == "static" ? "adapter" : adapter} from \"@sveltejs/adapter-${adapter}\"`,
	typescript || extra.includes("preprocess") ? "import sveltePreprocess from \"svelte-preprocess\"" : null,
	"",
	"export default {",
	typescript || extra.includes("preprocess") ? "\tpreprocess: sveltePreprocess()," : null,
	"\tkit: {",
	`\t\tadapter: ${adapter == "static" ? "adapter" : adapter}()`,
	"\t}",
	"}",
	""
].flat(Infinity).filter(( line ) => line != null).join("\n")

export const gitignore = [
	"",
	"# sveltekit",
	"/.svelte-kit/",
	"/build/",
	""
].join("\n")

export const index = ( typescript ) => [
	`<script${typescript ? " lang=\"ts\"" : ""} context=\"module\">`,
	"\texport const prerender = true",
	"</script>",
	"",
	"",
	"<h1>hello world</h1>",
	""
].join("\n")

export const robots = [
	"# https://www.robotstxt.org/robotstxt.html",
	"User-agent: *",
	"Disallow:",
	""
].join("\n")
