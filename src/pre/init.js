const licenseStrings = {
	mit: "MIT",
	isc: "ISC",
	unlicense: "Unlicense"
}

export const gitignore = [
	"# default",
	"node_modules/",
	"package-lock.json",
	""
].join("\n")

export const pkg = ( name, license, username ) => ({
	name: name,
	version: "0.1.0",
	description: "",
	author: username || "",
	keywords: [],
	license: licenseStrings[license]
})
