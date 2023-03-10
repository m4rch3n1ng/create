import App from "./main.svelte"
import "./main.css"

const app = new App({
	target: document.querySelector("#app"),
	props: {
		name: "world"
	}
})

export default app
