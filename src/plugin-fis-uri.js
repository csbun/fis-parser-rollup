/* eslint no-param-reassign: 0 */
'use strict';

const fs = require('fs');
const path = require('path');

const FIS_URI_REG = /\b(__uri)\(\s*('|")([^\/][^'"]+)\2\s*\)/g;
//                     (  1  ) (   2   )(    3      )(2)
//                      __uri  ( 'or" 不是/开头且不含引号 'or" )

module.exports = function fisUriPlugin(options) {
  options = options || {};
  const file = options.file;
  function noop() {}
  let addDeps = noop;
  let replaceUri = noop;

  if (file && file.cache) {
    const sourceFilePath = file.realpath;
    // 监听依赖文件
    addDeps = fileName => {
      if (fileName !== sourceFilePath) {
        file.cache.addDeps(fileName);
      }
    };

    // 替换 uri 地址为绝对路径
    replaceUri = function replaceFisUri(code, inputFileRealPath) {
      return code.replace(FIS_URI_REG, (match, uriFn, quotmark, depFileName) => {
        const depFileRealPath = path.resolve(path.dirname(inputFileRealPath), depFileName);
        const depFileRelativePath = path.relative(path.dirname(sourceFilePath), depFileRealPath)
                                    .replace(/\\/g, '/');
        return `${uriFn}(${quotmark}${depFileRelativePath}${quotmark})`;
      });
    };
  }

  // plugin ouput
  return {
    name: 'fis-uri',
    transform(code, id) {
      try {
        const stats = fs.statSync(id);
        if (stats.isFile()) {
          addDeps(id);
          // uris
          code = replaceUri(code, id);
        }
      } catch (e) {
        // do nothing
      }
      return {
        code,
        map: { mappings: '' },
      };
    },
  };
};
