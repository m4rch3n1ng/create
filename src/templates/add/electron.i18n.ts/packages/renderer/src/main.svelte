<script lang="ts">
	import { use } from "$use/tmp"
	import { i18n } from "$use/i18n"
	const test = "world"
</script>

<h1>{use} {$i18n(test)}</h1>
