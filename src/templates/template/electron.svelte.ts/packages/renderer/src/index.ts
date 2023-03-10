import App from "./main.svelte"
import "./main.css"

const app = new App({
	target: document.querySelector("#app")!
})

export default app
