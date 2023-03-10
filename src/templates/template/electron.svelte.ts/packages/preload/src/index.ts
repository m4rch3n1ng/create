import { contextBridge } from "electron"

const tmp: use.tmp = {
	use: "hello"
}

contextBridge.exposeInMainWorld("tmp", tmp)
