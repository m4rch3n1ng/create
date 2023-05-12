import { Package } from "./options/package"
import { App } from "./options/app"
import { Web } from "./options/web"

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
export declare const mkOptions: ({ dirname }: { dirname: string }) => Promise<Answers>

export declare function doCancel (): never
