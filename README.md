# fis-parser-rollup

A rollup parser for fis3 with default plugins:

- [rollup-plugin-bower-resolve](https://www.npmjs.com/package/rollup-plugin-bower-resolve)
- [rollup-plugin-commonjs](https://www.npmjs.com/package/rollup-plugin-commonjs)
- [rollup-plugin-node-resolve](https://www.npmjs.com/package/rollup-plugin-node-resolve)
- [rollup-plugin-uglify](https://www.npmjs.com/package/rollup-plugin-uglify)

## Install

```
npm i fis-parser-rollup --save-dev
```

## Usage

```javascript
//
fis.match('/path/to/entry.js', {
  parser: fis.plugin('rollup', options),
});
```

## Options

### debug

- `false`(default): uglify with [rollup-plugin-uglify](https://www.npmjs.com/package/rollup-plugin-uglify)
- `true`: with sourceMap inline
