import type { Svelte } from "./web/svelte.js"

type GenericWeb = {
	framework: "svelte"
	language: "js" | "ts"
}

type SvelteWeb = GenericWeb & Svelte

export type Web = SvelteWeb

export function mkWeb (): Promise<Web>
