/* eslint no-param-reassign: 0 */
'use strict';

const deasync = require('deasync');
const rollup = require('rollup');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginBowerResolve = require('rollup-plugin-bower-resolve');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');
const rollupPluginFisUri = require('./plugin-fis-uri');

module.exports = function rollupFile(file, config) {
  config = config || {};
  const isDebug = !!config.debug;
  const entry = file.realpath;

  // 异步变同步
  let isDone = false;
  let content = '';

  // rollup 配置，（DEBUG 模式下不压缩）
  const plugins = [
    // 支持 bower
    rollupPluginBowerResolve(),
    // 支持 Npm
    rollupPluginNodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    // 支持 CommonJS
    rollupPluginCommonjs(),
    // 支持 fis uri，同时解决文件依赖问题
    rollupPluginFisUri({
      file,
    }),
    // TODO: // 支持 require(tpl/html)
  ];
  // enable custom plugins
  if (config.plugins) {
    plugins.push.apply(plugins, config.plugins);
  }

  // 运行 bundle
  rollup.rollup({
    entry,
    plugins,
  })
  .then(bundle => {
    // 使用 rollup 合并代码
    const bundleResult = bundle.generate({
      // moduleName: PKG_NAME,
      // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
      format: 'iife',
      moduleName: 'omelette',
      sourceMap: isDebug,
      banner: `/* ${new Date()} */`,
    });
    // DEBUG 模式则添加 sourceMap
    content = bundleResult.code || '';
    if (isDebug && bundleResult.map) {
      content += `\n//# sourceMappingURL=${bundleResult.map.toUrl()}`;
    }
    isDone = true;
  })
  .catch(err => {
    fis.log.warn(`[parser-rollup]: bundle fail: <${entry}> ${err.message || ''}`);
    content = isDebug ? `console.log(${JSON.stringify(err)});` : '/* error */';
    isDone = true;
  });
  // TODO: 支持 __uri() 方法

  // 使用 deasync 让 rollup 同步输出到 content
  deasync.loopWhile(() => !isDone);

  // return
  return content;
};
