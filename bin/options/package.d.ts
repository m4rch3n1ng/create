export type Package = {
	language: "js" | "jsdoc" | "ts"
	private: undefined | boolean
}

export function mkPackage (): Promise<Package>
