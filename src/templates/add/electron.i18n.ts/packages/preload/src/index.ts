import { contextBridge } from "electron"
import * as i18n from "./i18n"

const tmp: use.tmp = {
	use: "hello"
}

contextBridge.exposeInMainWorld("tmp", tmp)
contextBridge.exposeInMainWorld("i18n", i18n)
