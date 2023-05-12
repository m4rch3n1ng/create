export type Svelte = {
	tooling: "vite" | "kit"
	scripts: ("build")[]
}

export function mkSvelte (): Promise<Svelte>
