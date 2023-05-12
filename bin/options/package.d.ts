export type Package = {
	language: "js" | "ts"
	private: undefined | boolean
}

export function mkPackage (): Promise<Package>
