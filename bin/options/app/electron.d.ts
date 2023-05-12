export type Electron = {
	framework: "svelte"
	i18n: boolean
}

export function mkElectron (): Promise<Electron>
