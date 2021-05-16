module.exports = {
	__error: [
		"<script context=\"module\">",
		"\texport function load ({ status, error }) {",
		"\t\treturn {",
		"\t\t\tprops: {",
		"\t\t\t\tstatus,",
		"\t\t\t\terror",
		"\t\t\t}",
		"\t\t}",
		"\t}",
		"",
		"\texport const hydrate = false",
		"</script>",
		"",
		"<script>",
		"\texport let status",
		"\texport let error",
		"</script>",
		"",
		"",
		"<svelte:head>",
		"\t<title>{status}: {error.message}</title>",
		"</svelte:head>",
		"",
		"<div class=\"container\">",
		"\t<div class=\"code\">{status}</div>",
		"\t<div class=\"message\">{error.message}</div>",
		"</div>",
		"",
		"<div class=\"footer\">",
		"\t<div class=\"button\" on:click={() => window.location.reload()}>reload</div>",
		"\t<div class=\"button\" on:click={() => window.history.back()}>back</div>",
		"\t<a class=\"button\" href=\"/\">home</a>",
		"</div>",
		"",
		"",
		"<style>",
		"",
		"\t.button, .code {",
		"\t\tuser-select: none;",
		"\t}",
		"",
		"\t@media only screen and (max-width: 750px) {",
		"\t\t.container {",
		"\t\t\tpadding-top: 15vh !important;",
		"\t\t}",
		"",
		"\t\t.code {",
		"\t\t\theight: 50vw !important;",
		"",
		"\t\t\tfont-size: 50vw !important;",
		"\t\t}",
		"",
		"\t\t.message {",
		"\t\t\tfont-size: 6vw !important;",
		"\t\t}",
		"\t}",
		"",
		"\t@media only screen and (max-height: 800px) {",
		"\t\t.container {",
		"\t\t\tpadding-top: 8vh !important;",
		"\t\t}",
		"\t}",
		"",
		"\t@media only screen and (max-height: 600px) {",
		"\t\t.container {",
		"\t\t\tpadding-top: 10vh !important;",
		"\t\t}",
		"",
		"\t\t.code {",
		"\t\t\theight: 45vh !important;",
		"",
		"\t\t\tfont-size: 45vh !important;",
		"\t\t}",
		"",
		"\t\t.message {",
		"\t\t\tfont-size: 5vh !important;",
		"\t\t}",
		"\t}",
		"",
		"\t.container {",
		"\t\tpadding: 10vh 0 0;",
		"\t}",
		"",
		"\t.code {",
		"\t\theight: 45vh;",
		"",
		"\t\tcolor: #ff806066;",
		"\t\tfont-size: 45vh;",
		"\t\ttext-align: center;",
		"\t}",
		"",
		"\t.message {",
		"\t\ttop: 50vh;",
		"",
		"\t\tfont-size: 5vh;",
		"\t\ttext-align: center;",
		"\t}",
		"",
		"\t.footer {",
		"\t\tposition: absolute;",
		"\t\tbottom: 40px;",
		"\t\tleft: 5vw;",
		"\t\tright: 5vw;",
		"",
		"\t\tdisplay: grid;",
		"\t\tgrid-template-columns: 1fr 1fr 1fr;",
		"",
		"\t\tborder-top: 4px solid #3000e040;",
		"\t}",
		"",
		"\t.button {",
		"\t\theight: calc(3vh + 30px);",
		"",
		"\t\tdisplay: grid;",
		"\t\tplace-items: center;",
		"",
		"\t\tcolor: #000000;",
		"\t\tfont-size: 22px;",
		"\t\ttext-align: center;",
		"\t\ttext-decoration: none;",
		"",
		"\t\tcursor: pointer;",
		"",
		"\t\ttransition: .2s background-color;",
		"\t}",
		"",
		"\t.button:hover {",
		"\t\tbackground: #3000e040;",
		"\t}",
		"",
		"</style>",
		""
	].join("\n"),
	message: [
		"<script>",
		"\texport let message",
		"",
		"\tlet time",
		"\t$: {",
		"\t\tlet curr = Math.random()",
		"\t\ttime = curr",
		"",
		"\t\tsetTimeout(() => {",
		"\t\t\tif (curr == time) message = null",
		"\t\t}, 5000)",
		"\t}",
		"</script>",
		"",
		"",
		"{#if message}",
		"\t<div class=\"{message.type || \"info\"} main\">",
		"\t\t<div class=\"text\">{message.text}</div>",
		"\t\t<div on:click={() => message = null} class=\"close\"></div>",
		"\t</div>",
		"{/if}",
		"",
		"",
		"<style>",
		"",
		"\t.main {",
		"\t\tposition: fixed;",
		"\t\tbottom: 20px;",
		"\t\tleft: 120px;",
		"\t\tright: 120px;",
		"\t\tz-index: 40;",
		"",
		"\t\theight: 48px;",
		"\t\tpadding: 15px 50px;",
		"",
		"\t\tbox-sizing: border-box;",
		"\t}",
		"",
		"\t.main.info {",
		"\t\tbackground-color: #0000ff33;",
		"\t}",
		"",
		"\t.main.warn {",
		"\t\tbackground-color: #ffff0033;",
		"\t}",
		"",
		"\t.main.error {",
		"\t\tbackground-color: #ff000033;",
		"\t}",
		"",
		"\t.text {",
		"\t\tfont-size: 20px;",
		"\t\ttext-align: center;",
		"\t}",
		"",
		"\t.close {",
		"\t\tposition: absolute;",
		"",
		"\t\tbottom: 10px;",
		"\t\tright: 25px;",
		"",
		"\t\twidth: 30px;",
		"\t\theight: 30px;",
		"",
		"\t\topacity: 0.4;",
		"",
		"\t\tcursor: pointer;",
		"\t}",
		"",
		"\t.close:hover {",
		"\t\topacity: 1;",
		"\t}",
		"",
		"\t.close:before, .close:after {",
		"\t\tposition: absolute;",
		"",
		"\t\tleft: 15px;",
		"",
		"\t\theight: 33px;",
		"\t\twidth: 2px;",
		"",
		"\t\tbackground-color: #666666;",
		"",
		"\t\tcontent: \"\";",
		"",
		"\t\ttransition: 0.4s background-color;",
		"\t}",
		"",
		"\t.close:before {",
		"\t\ttransform: rotate(45deg);",
		"\t}",
		"",
		"\t.close:after {",
		"\t\ttransform: rotate(-45deg);",
		"\t}",
		"",
		"</style>",
		""
	].join("\n")
}
