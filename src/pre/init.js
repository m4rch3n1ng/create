const licenseStrings = {
	mit: "MIT",
	isc: "ISC",
	unlicense: "Unlicense"
}

module.exports = {
	changelog: () => [
		`( v ${new Date().toISOString().split("T")[0]} )`,
		"[ general ]",
		"[ content ]",
		"[ fixes ]",
		"[ misc ]",
		""
	].join("\n"),
	gitignore: [
		"# default",
		"node_modules/",
		""
	].join("\n"),
	package: ( name, license, username ) => ({
		name: name,
		version: "0.1.0",
		description: "",
		author: username || "",
		main: "src/index.js",
		keywords: [],
		license: licenseStrings[license]
	}),
	todo: [
		"[ general ]",
		"[ content ]",
		"[ bugs ]",
		"[ misc ]",
		""
	].join("\n")
}
