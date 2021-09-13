import * as general from "./sveltekit/general.js"
import * as misc from "./sveltekit/misc.js"
import * as templates from "./sveltekit/templates.js"
import * as typescript from "./sveltekit/typescript.js"

export default function sveltekit ( files, options ) {
	const pkgIndex = files.findIndex(({ name }) => name == "package.json")

	let pkg = {
		...files[pkgIndex].content,
		scripts: {
			dev: "svelte-kit dev",
			build: "svelte-kit build --verbose",
			preview: "svelte-kit preview"
		},
		devDependencies: {
			[`@sveltejs/adapter-${options.adapter}`]: "next",
			"@sveltejs/kit": "next",
			"svelte": "^3.42.1"
		},
		type: "module"
	}

	if (options.typescript) {
		pkg.devDependencies = {
			...pkg.devDependencies,
			"svelte-preprocess": "^4.7.4",
			"typescript": "^4.3.5"
		}
	}

	options.fonts.forEach(( font ) => {
		pkg.devDependencies[`@fontsource/${font}`] = "^4.5.0"
	})

	files[pkgIndex].content = pkg

	const gitignoreIndex = files.findIndex(({ name }) => name == ".gitignore")
	files[gitignoreIndex].content += general.gitignore

	files = files.concat([
		{
			name: "svelte.config.js",
			content: general.config(options.typescript, options.adapter, options.extra)
		},
		{
			name: "src",
			children: [
				{
					name: "app.css",
					content: general.css(options.fonts)
				},
				{
					name: "app.html",
					content: general.app
				},
				{
					name: "routes",
					children: [
						{
							name: "__layout.svelte",
							content: general.__layout(options.typescript)
						},
						{
							name: "index.svelte",
							content: general.index(options.typescript)
						}
					]
				},
				{
					name: "lib",
					children: []
				}
			]
		},
		{
			name: "static",
			children: [
				{
					name: "robots.txt",
					content: general.robots
				}
			]
		}
	])

	if (options.typescript) {
		const srcIndex = files.findIndex(({ name }) => name == "src")

		files[srcIndex].children.push({
			name: "global.d.ts",
			content: typescript.global
		})

		files.push({
			name: "tsconfig.json",
			content: typescript.tsconfig
		})
	}

	if (options.templates.length) {
		const srcIndex = files.findIndex(({ name }) => name == "src")
		const srcLibIndex = files[srcIndex].children.findIndex(({ name }) => name == "lib")
		const srcRoutesIndex = files[srcIndex].children.findIndex(({ name }) => name == "routes")

		options.templates.forEach(( template ) => {
			switch (template) {
				case "__error": {
					files[srcIndex].children[srcRoutesIndex].children.push({
						name: "__error.svelte",
						content: templates.__error(options.typescript)
					})
					break
				}
				case "message": {
					files[srcIndex].children[srcLibIndex].children.push({
						name: "message.svelte",
						content: templates.message.svelte(options.typescript)
					},
					{
						name: !options.typescript ? "message.js" : "message.ts",
						content: !options.typescript ? templates.message.js : templates.message.ts
					})
				}
			}
		})
	}

	if (options.extra.length) {
		const srcIndex = files.findIndex(({ name }) => name == "src")
		const srcLibIndex = files[srcIndex].children.findIndex(({ name }) => name == "lib")
		const pkgIndex = files.findIndex(({ name }) => name == "package.json")
		const pkg = files[pkgIndex].content

		if (options.extra.includes("database")) {
			switch (options.database) {
				case "mongodb": {
					pkg.dependencies = {
						...pkg.dependencies,
						mongodb: "^4.1.1"
					}

					files[srcIndex].children[srcLibIndex].children.push({
						name: !options.typescript ? "mongodb.js" : "mongodb.ts",
						content: !options.typescript ? misc.mongodb.js : misc.mongodb.ts
					})
					break
				}
				case "mysql": {
					pkg.dependencies = {
						...pkg.dependencies,
						mysql: "^2.18.1"
					}

					files[srcIndex].children[srcLibIndex].children.push({
						name: !options.typescript ? "mysql.js" : "mysql.ts",
						content: !options.typescript ? misc.mysql.js : misc.mysql.ts
					})

					if (options.typescript) files[pkgIndex].content.devDependencies["@types/mysql"] = "^2.15.19"
					break
				}
			}
		}

		if (options.extra.includes("preprocess")) {
			if (!options.typescript) {
				pkg.devDependencies["svelte-preprocess"] = "^4.7.4"
			}
		}

		if (options.extra.includes("scripts") && options.scripts.length) {
			const scripts = [{ name: "_utils.js", content: misc.scripts._utils }]

			if (options.scripts.includes("build")) {
				pkg.scripts = {
					...pkg.scripts,
					build: "npm run build:pre && npm run build:build && npm run build:post",
					"build:pre": "node scripts/build.pre.js",
					"build:build": "svelte-kit build --verbose",
					"build:post": "node scripts/build.post.js"
				}

				pkg.devDependencies.colorette = "^1.4.0"

				if (options["build.zip"]) {
					pkg.devDependencies["7zip-min"] = "^1.3.3"
				}

				if (options["build.extractLicenses"]) {
					pkg.devDependencies["@m4rch/extract-licenses"] = "^0.1.0"
				}

				scripts.push({
					name: "build.pre.js",
					content: misc.scripts.build.pre({ "7z": options["build.7z"], zip: options["build.zip"] })
				})

				scripts.push({
					name: "build.post.js",
					content: misc.scripts.build.post({
						pkg,
						"7z": options["build.7z"],
						zip: options["build.zip"],
						install: options["build.install"],
						extractLicenses: options["build.extractLicenses"]
					})
				})
			}

			files.push({ name: "scripts", children: scripts })
		}

		files[pkgIndex].content = pkg
	}

	return files
}
