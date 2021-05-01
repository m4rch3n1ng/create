const licenseStrings = {
	mit: "MIT",
	isc: "ISC",
	unlicense: "Unlicense"
}

module.exports = {
	package: ( name, license, username ) => ({
		name: name,
		version: "0.1.0",
		description: "",
		author: username || "",
		main: "index.js",
		keywords: [],
		license: licenseStrings[license]
	}),
	gitignore: [
		"# default",
		"node_modules/",
		""
	].join("\n"),
	todo: [
		"[ general ]",
		"[ content ]",
		"[ bugs ]",
		"[ misc ]",
		""
	].join("\n"),
	changelog: () => [
		`( v ${new Date().toISOString().split("T")[0]} )`,
		"[ general ]",
		"[ content ]",
		"[ fixes ]",
		"[ misc ]",
		""
	].join("\n")
}
