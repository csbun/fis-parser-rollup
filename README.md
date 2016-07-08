# fis-parser-rollup

A rollup parser for fis3 with default plugins:

- [rollup-plugin-bower-resolve](https://www.npmjs.com/package/rollup-plugin-bower-resolve)
- [rollup-plugin-commonjs](https://www.npmjs.com/package/rollup-plugin-commonjs)
- [rollup-plugin-node-resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve)

## Install

```
npm i fis-parser-rollup --save-dev
```

## Usage

```javascript
// fis-conf.js
fis.match('/path/to/entry.js', {
  parser: fis.plugin('rollup', options),
});
```

## Options

### debug

- `false`: default
- `true`: with sourceMap inline and bundle error message

### plugins

Custom rollup plugins to use.

```javascript
// fis-conf.js
fis.match('/path/to/entry.js', {
  parser: fis.plugin('rollup', {
    debug: true,
    plugins: [
      require('rollup-plugin-babel')()
    ]
  }),
});
```
