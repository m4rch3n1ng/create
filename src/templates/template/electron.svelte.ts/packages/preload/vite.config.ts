import { defineConfig } from "vite"
import { builtinModules } from "module"
import { join as joinPath } from "node:path"

export default defineConfig({
	mode: process.env.MODE,
	root: __dirname,
	build: {
		sourcemap: process.env.MODE == "development" ? "inline": false,
		target: "esnext",
		outDir: joinPath(__dirname, "dist"),
		assetsDir: ".",
		minify: process.env.MODE != "development",
		lib: {
			entry: "./src/index.ts",
			formats: [ "cjs" ],
		},
		rollupOptions: {
			external: [
				"electron",
				"node:fs/promises",
				...builtinModules.flatMap(( m ) => [ m, `node:${m}` ]),
			],
			output: {
				entryFileNames: "[name].js"
			},
		},
		emptyOutDir: true,
		reportCompressedSize: false
	}
})
