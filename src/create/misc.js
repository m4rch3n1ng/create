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
	name,
	version: "0.1.0",
	description: "",
	author: username || "",
	keywords: [],
	license: licenseStrings[license]
})

export const changelog = [
	"# changelog",
	"",
	"all notable changes to this project will be documented in this file.",
	"",
	"the format is loosely based on [keep a changelog](https://keepachangelog.com/en/1.0.0/),",
	"and this project adheres to [semantic versioning](https://semver.org/spec/v2.0.0.html).",
	"",
	"## [unreleased]",
	""
].join("\n")
