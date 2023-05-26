import type { Electron } from "./app/electron.js"

type GenericApp = {
	app: "electron"
}

type ElectronApp = GenericApp & Electron

export type App = ElectronApp

export function mkApp (): Promise<App>
