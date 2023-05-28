# changelog

all notable changes to this project will be documented in this file.

the format is loosely based on [keep a changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [semantic versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

## [1.1.3]

### changed

- adjust tsconfig
- template: bump

### fix

- fix: @clack/prompts svelte.kit required scripts

## [1.1.2]

### add

- template: package.jsdoc

### changed

- formatting changes to prompt

### fix

- fix: slight refactor

## [1.1.1]

### added

- scripts: prepare script

### fixed

- fix: fix bin force overwrite

## [1.1.0]

### added

- migration to @clack/prompts

### changed

- template: bump

### fixed

- typing: fixed types

## [1.1.0]

### added

- migration to @clack/prompts

### changed

- template: bump

### fixed

- typing: fixed types

## [1.0.1]

### changed

- scripts: more colors in update-latest
- template: bump

## [1.0.0]

### added

template: add/license
- te,plate: add/svelte.kit.scripts.build
- template: package.js, package.ts
- template: svelte.vite.js, svelte.vite.ts
- template: svelte.kit.js, svelte.kit.ts
- template: add/changelog.md
- template: add/electron.i18n.ts
- template: electron.svelte.ts
- script: pre-, post-build
- script: update-latest
- 

### changed

- merge package
- chore: use typescript

## [0.4.1] - 2021-09-14

### changed

- bumped versions
- prefixed internal imports with "node:"

### fixed

- fixed bug where default name was . when used in current directory

## [0.4.0] - 2021-09-13

### added

- cli: added notice on what files are being created
- sveltekit: when using `roboto` font: added `font-weight: 700` to replace `font-weight: bold` to fix blurred fonts
- sveltekit: when using `roboto` font: added `@import "@fontsource/roboto/700.css`
- sveltekit: scripts
- sveltekit: scripts: build (build:pre, build:post)
- vscode-extension

### changed

- cli: changed example
- sveltekit: fonts are now added to devDependencies
- questions: changelog now default true

### removed

- sveltekit: removed unnecessary dependency `@types/mongodb` when choosing mongodb with a typescript project

## [0.3.0] - 2021-09-01

### added

- changelog options

### changed

- restructure files
- restructure questions for better expandability
- changed `changelog.md`
- `todo` => `todo.md`
- sveltekit: reverted adapter options

## fixed

- sveltekit: `.gitignore`: /.svelte/ => /.svelte-kit/

## [0.2.3] - 2021-08-05

### added

- added exports field to package.json

### changed

- sveltekit: adjusted `mongodb` template for `mongodb` v4
- sveltekit: adjusted adapter options for output
- bump versions

### removed

- svelte (rollup): removed `sirv-cli` option

### fixed

- fix: sveltekit: `mongodb` export ObjectId instead of ObjectID

## [0.2.1] - 2021-06-20

### changed

- changed depency `sort-package-json` to `@m4rch/sort-package-json`

## [0.2.1] - 2021-06-20

### added

- sveltekit: added typescript language support for templates
- added package `sort-package-json`
- added package sade
- added handler

### changed

- sveltekit: moved extra and typescript to extra files
- moved `licenses.js` from create/ to pre/

### removed

- removed todo files

### fixed

- sveltekit: fixed spelling mistake in `general.js`

## [0.2.0] - 2021-06-15

### added

- sveltekit: added `fira-mono` to default fonts

### changed

- bumped version numbers
- renamed `cli.js` to `create.js`
- renamed `functions.js` to `utils.js`
- minor adjustment to logging functions
- adjusted for `@m4rch/command` ^v0.2.0

## [0.1.8] - 2021-05-28

### added

- sveltekit: added --verbose option to build command

### changed

- bumped versions
- moved `tsconfig.js`
- changed general to individual imports
- typescript: changed module to esm
- svelte (rollup): renamed start command to serve

### removed

- `functions.js`: removed useless write function in writefiles

### fixed

- sveltekit: fixed: sveltekit start -> sveltekit preview
- typescript: fixed `.npmignore`

## [0.1.7] - 2021-05-24

### added

- typescript: added dev script

### changed

- bump versions
- moved changelog to `changelog.md`
- changed highlighting for cli
- changed to es6 modules
- minor adjustment to `tsconfig.json`

### fixed

- typescript: fixed bug with install option

## [0.1.6] - 2021-05-16

### added

- sveltekit: added message template
- javascript: added empty index.js
- typescript: added @types/node to devDependencies

### changed

- bump versions
- sveltekit: changed .gitignore comment

### fixed

- sveltekit: reserved word "static" for adapter
- javascript: todo in incorrect folder

## [0.1.5] - 2021-05-09

### added

- sveltekit: added template options
- javascript: added type option

### changed

- updated `@m4rch/command` dependency
- made y/n options instant
- changed entry file for javascript to `src/index.js`

## [0.1.4] - 2021-05-07

### changed

- sveltekit: changed svelte.config to esm
- sveltekit: renamed `$layout.svelte` to `__layout.svelte`
- updated versions to latest
- sorted files

## [0.1.3] - 2021-05-01

### fixed

- sveltekit: fixed a bug where fonts wouldn't get added to dependencies

## [0.1.2] - 2021-05-01

### added

- sveltekit: added databases and preprocess
- sveltekit: added fonts
- sveltekit: added adapters
- added changelog and todo to most templates

### changed

- renamed svelte-kit to sveltekit

## [0.1.0] - 2021-04-27

### added

- initial release
