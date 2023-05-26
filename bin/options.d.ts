import { Package } from "./options/package.js"
import { App } from "./options/app.js"
import { Web } from "./options/web.js"

type Generic = {
	name: string
	license: "agplv3" | "gplv3" | "mit" | "unlicense"
	kind: "package" | "app" | "web"
	changelog: boolean
}

export type AnswerPkg = Generic & Package
export type AnswerApp = Generic & App
export type AnswerWeb = Generic & Web

export type Answers = AnswerPkg | AnswerApp | AnswerWeb
export declare const mkOptions: ({ dir, dirname }: { dir: string, dirname: string }) => Promise<Answers>

export declare function doCancel (): never
