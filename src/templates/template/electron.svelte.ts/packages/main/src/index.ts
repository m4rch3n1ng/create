import { app, BrowserWindow } from "electron"
import { join } from "node:path"
import { URL } from "node:url"
import "./ipc.js"

const isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
	app.quit()
	process.exit(0)
}

export let mainWindow: BrowserWindow

async function createWindow (): Promise<void> {
	mainWindow = new BrowserWindow({
		show: false, // use "ready-to-show" event to show window
		minWidth: 800,
		minHeight: 500,
		webPreferences: {
			webviewTag: true,
			preload: join(__dirname, "../../preload/dist/index.js"),
			nodeIntegration: false,
			contextIsolation: true,
			defaultFontFamily: {
				standard: "Roboto Mono",
				sansSerif: "Roboto Mono"
			}
		}
	})

	mainWindow.on("ready-to-show", () => {
		mainWindow?.show()
		if (import.meta.env.MODE === "development") {
			mainWindow?.webContents.openDevTools()
		}
	})

	const pageUrl = import.meta.env.MODE === "development" && import.meta.env.VITE_DEV_SERVER_URL !== undefined
		? import.meta.env.VITE_DEV_SERVER_URL
		: new URL("../renderer/dist/index.html", "file://" + __dirname).toString()

	mainWindow.removeMenu()
	await mainWindow.loadURL(pageUrl)
}

app.on("second-instance", () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore()
		mainWindow.focus()
	}
})

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})


app.disableHardwareAcceleration()
app.whenReady()
	.then(createWindow)
	.catch(( e ) => console.error("failed create window:", e))

export { app }
