[npm]: https://img.shields.io/npm/v/rollup-plugin-svg-store
[npm-url]: https://www.npmjs.com/package/rollup-plugin-svg-store
[size]: https://packagephobia.now.sh/badge?p=rollup-plugin-svg-store
[size-url]: https://packagephobia.now.sh/result?p=rollup-plugin-svg-store

[![npm][npm]][npm-url]
[![size][size]][size-url]

# rollup-plugin-svg-store

🍣 A Rollup plugin which imports a Rollup bundle as a string.

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Rollup v1.20.0+.

## Install

Using npm:

```console
npm install rollup-plugin-svg-store --save-dev
```

## Usage

Assuming a `src/index.js` exists and contains code like the following:

```js
import icons from './icons/*.svg';
console.log(icons);
```

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import svgStore from 'rollup-plugin-svg-store';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [svgStore()]
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

### `store`

Type: `Object`<br>
Default: `{}`

The options to forward to `svgstore`.

### `optimize`

Type: `Object`<br>
Default: `{}`

The options to forward to `svgo`.

### `prefix`

Type: `String`<br>
Default: `""`

The string to prepend to every icon ID.

### `exclude`

Type: `String` | `Array[...String]`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `include`

Type: `String` | `Array[...String]`<br>
Default: `null`
