<!-- omit in toc -->
# @m4rch/create

* [about](#about)
* [use](#use)
	* [install](#install)
	* [npx](#npx)
	* [api](#api)

## about

a small command-line-interface to quickly initialise a javascript, typescript or svelte project.

more templates get added when i need them.  
maybe.

## use

### install

to install it simply use

```sh
$ npm i @m4rch/create -g
```

and then use

```sh
$ create [dir]
```

to use this package

### npx

if you dont want to globally install the package you can just use npx

```sh
$ npx @m4rch/create
```

### api

this package only works with [esm](https://nodejs.org/api/esm.html)

```js
import create from "@m4rch/create"
```

```js
import { handler } from "@m4rch/create/handler"
```
