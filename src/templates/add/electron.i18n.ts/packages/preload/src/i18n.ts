import { derived, writable } from "svelte/store"

import en from "./i18n/en.js"

const languages = { en } as const
type lang = keyof typeof languages

function init () {
	const languages = { en } as const
	const langs = Object.keys(languages) as lang[]

	const iso = writable<lang>("en")
	const lang = derived(iso, ( $iso ) => languages[$iso])
	const i18n = derived(lang, ( $lang ) => getMessage.bind(null, $lang))

	return { i18n, iso, lang, langs }
}

function getMessage ( lang: typeof en, key: keyof typeof en ) {
	return lang[key]
}

export const { i18n, iso, lang, langs } = init()

export interface i18n {
	i18n: typeof i18n,
	iso: typeof iso,
	lang: typeof lang,
	langs: typeof langs
}
