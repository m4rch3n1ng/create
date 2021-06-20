export const config = [
	"import { defineConfig } from \"vite\"",
	"import svelte from \"@sveltejs/vite-plugin-svelte\"",
	"",
	"export default defineConfig({",
	"\tplugins: [",
	"\t\tsvelte()",
	"\t],",
	"\tpublicDir: \"static\",",
	"\tbuild: {",
	"\t\toutDir: \"dist\"",
	"\t}",
	"})",
	""
].join("\n")

export const gitignore = [
	"",
	"# svelte",
	"/dist/",
	""
].join("\n")

export const html = ( typescript ) => [
	"<!DOCTYPE html>",
	"<html lang=\"en\">",
	"<head>",
	"\t<meta charset=\"UTF-8\" />",
	"\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />",
	"",
	"\t<title>svelte app</title>",
	"",
	`\t<script type=\"module\" src=\"${!typescript ? "/src/main.js" : "/src/main.ts"}\" defer></script>`,
	"</head>",
	"<body>",
	"</body>",
	"</html>",
	""
].join("\n")

export const svelteConfig = [
	"const sveltePreprocess = require(\"svelte-preprocess\")",
	"",
	"module.exports = {",
	"\tpreprocess: sveltePreprocess()",
	"}",
	""
].join("\n")

export const tsconfig = [
	"{",
	"\t\"compilerOptions\": {",
	"\t\t/* - project options - */",
	"\t\t\"isolatedModules\": true,",
	"\t\t\"module\": \"esnext\",",
	"\t\t\"removeComments\": true,",
	"\t\t\"sourceMap\": true,",
	"\t\t\"target\": \"esnext\",",
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
	"\t\t\"types\": [ \"svelte\" ],",
	"",
	"\t\t/* - experimental - */",
	"\t\t\"emitDecoratorMetadata\": true,",
	"\t\t\"experimentalDecorators\": true,",
	"",
	"\t\t/* - advanced - */",
	"\t\t\"forceConsistentCasingInFileNames\": true,",
	"\t\t\"importsNotUsedAsValues\": \"error\",",
	"\t\t\"skipLibCheck\": true,",
	"\t},",
	"\t\"include\": [ \"src/**/*.d.ts\", \"src/**/*.ts\", \"src/**/*.svelte\" ]",
	"}",
	""
].join("\n")
