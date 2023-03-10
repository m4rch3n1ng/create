import { defineConfig } from "vite"
import { builtinModules } from "module"
import { join as joinPath } from "node:path"

export default defineConfig({
	mode: process.env.MODE,
	root: __dirname,
	build: {
		sourcemap: process.env.MODE == "development",
		target: "esnext",
		outDir: joinPath(__dirname, "dist"),
		// minify: process.env.MODE != "development",
		minify: false,
		lib: {
			entry: "src/index.ts",
			formats: [ "cjs" ],
		},
		rollupOptions: {
			external: [
				"electron",
				...builtinModules.flatMap(( m ) => [ m, `node:${m}` ]),
			],
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: "[name].[hash].js"
			}
		},
		emptyOutDir: true,
		reportCompressedSize: false
	}
})
