/* eslint no-param-reassign: 0 */
'use strict';

const rollupSync = require('./src/rollup-sync');

module.exports = function fisPreprocessorRollup(content, file, conf) {
  if (file.isJsLike && /\.js/.test(file.realpath)) {
    content = rollupSync(file, conf);
  }
  return content;
};
