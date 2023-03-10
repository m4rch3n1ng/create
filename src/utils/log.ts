import { cyan, green, red, yellow } from "kleur/colors"

export function info ( ...text: any[] ) {
	console.log(cyan("m4!info"), ...text)
}

export function success ( ...text: any[] ) {
	console.log(green("m4!success"), ...text)
}

export function warn ( ...text: any[] ) {
	console.log(yellow("m4!warn"), ...text)
}

export function error ( ...text: any[] ) {
	console.log(red("m4!error"), ...text)
}
