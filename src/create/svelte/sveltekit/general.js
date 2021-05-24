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
	fonts && fonts.length ? fonts.map(( font ) => `@import "@fontsource/${font}";`).concat("") : null,
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
	""
].flat(Infinity).filter(( line ) => line != null).join("\n")

export const config = ( typescript, adapter, extra ) => [
	`import ${adapter == "static" ? "adapter" : adapter} from \"@sveltejs/adapter-${adapter}\"`,
	typescript || extra.includes("preoprocess") ? "import sveltePreprocess from \"svelte-preprocess\"" : null,
	"",
	"export default {",
	typescript || extra.includes("preoprocess") ? "\tpreprocess: sveltePreprocess(),\n" : null,
	"\tkit: {",
	`\t\tadapter: ${adapter == "static" ? "adapter" : adapter}()`,
	"\t}",
	"}",
	""
].filter(( line ) => line != null).join("\n")

export const extra = {
	mongodb: [
		"import mongodb from \"mongodb\"",
		"const { MongoClient, ObjectID } = mongodb",
		"",
		"let client = null",
		"let db = null",
		"",
		"export async function init () {",
		"\tif (!client) {",
		"\t\tclient = await MongoClient.connect(\"mongodb://localhost:27017/\", { useNewUrlParser: true, useUnifiedTopology: true })",
		"\t\tdb = client.db(\"name\")",
		"\t}",
		"",
		"\treturn { db, client }",
		"}",
		"",
		"export { ObjectID }",
		""
	].join("\n"),
	mysql: [
		"import { createConnection } from \"mysql\"",
		"",
		"const options = {",
		"\thost: \"host\",",
		"\tuser: \"user\",",
		"\tpassword: \"password\",",
		"\tdatabase: \"database\"",
		"}",
		"",
		"let db = null",
		"",
		"export async function init () {",
		"\tif (!db) {",
		"\t\tdb = createConnection(options)",
		"\t\tawait new Promise(( resolve, reject ) => db.connect((( err ) => err ? reject(err) : resolve())))",
		"\t}",
		"",
		"\treturn { db }",
		"}",
		"",
		"export function query ( db, query ) {",
		"\treturn new Promise(( resolve ) => {",
		"\t\tdb.query(query, ( error, data ) => error ? resolve(null) : resolve(data))",
		"\t})",
		"}",
		""
	].join("\n")
}

export const gitignore = [
	"",
	"# sveltekit",
	"/.svelte/",
	"/build/",
	""
].join("\n")

export const index = ( typescript ) => [
	`<script context=\"module\"${typescript ? " lang=\"ts\"" : ""}>`,
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

export const todo = [
	"[ content ]",
	"[ ui ]",
	"[ bugs ]",
	"[ misc ]",
	""
].join("\n")

export const ts = {
	tsconfig: [
		"{",
		"\t\"compilerOptions\": {",
		"\t\t/* - project options - */",
		"\t\t\"allowJs\": true,",
		"\t\t\"checkJs\": true,",
		"\t\t\"isolatedModules\": true,",
		"\t\t\"lib\": [\"es2020\"],",
		"\t\t\"module\": \"es2020\",",
		"\t\t\"removeComments\": true,",
		"\t\t\"sourceMap\": true,",
		"\t\t\"target\": \"es2019\",",
		"",
		"\t\t/* - strict checks - */",
		"\t\t\"alwaysStrict\": true,",
		"\t\t\"noImplicitAny\": true,",
		"\t\t\"noImplicitThis\": true,",
		"\t\t\"strict\": true,",
		"\t\t\"strictBindCallApply\": true,",
		"\t\t\"strictFunctionTypes\": true,",
		"\t\t\"strictNullChecks\": true,",
		"\t\t\"strictPropertyInitialization\": true,",
		"",
		"\t\t/* - linter checks - */",
		"\t\t\"noImplicitReturns\": true,",
		"\t\t\"noFallthroughCasesInSwitch\": true,",
		"\t\t\"noUncheckedIndexedAccess\": true,",
		"\t\t\"noUnusedLocals\": true,",
		"\t\t\"noUnusedParameters\": true,",
		"",
		"\t\t/* - module resolution - */",
		"\t\t\"baseUrl\": \".\",",
		"\t\t\"esModuleInterop\": true,",
		"\t\t\"moduleResolution\": \"node\",",
		"\t\t\"paths\": {",
		"\t\t\t\"lib/*\": [\"src/lib/*\"]",
		"\t\t},",
		"",
		"\t\t/* - advanced - */",
		"\t\t\"forceConsistentCasingInFileNames\": true,",
		"\t\t\"importsNotUsedAsValues\": \"error\",",
		"\t\t\"resolveJsonModule\": true,",
		"\t\t\"skipLibCheck\": true,",
		"\t},",
		"\t\"include\": [\"src/**/*.d.ts\", \"src/**/*.js\", \"src/**/*.ts\", \"src/**/*.svelte\"]",
		"}",
		""
	].join("\n"),
	global: [
		"/// <reference types=\"@sveltejs/kit\" />",
		"/// <reference types=\"svelte\" />",
		"/// <reference types=\"vite/client\" />",
		""
	].join("\n")
}
