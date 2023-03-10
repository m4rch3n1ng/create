import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { join as joinPath } from "node:path"

export default defineConfig({
	mode: process.env.MODE,
	root: __dirname,
	resolve: {
		alias: {
			$assets: joinPath(__dirname, "src", "assets"),
			$lib: joinPath(__dirname, "src", "lib"),
			$pages: joinPath(__dirname, "src", "pages"),
			$use: joinPath(__dirname, "src", "use"),
			$utils: joinPath(__dirname, "src", "utils")
		}
	},
	plugins: [
		svelte()
	],
	base: "./",
	build: {
		sourcemap: process.env.MODE == "development",
		target: "esnext",
		outDir: joinPath(__dirname, "dist"),
		emptyOutDir: true,
		reportCompressedSize: false
	}
})
