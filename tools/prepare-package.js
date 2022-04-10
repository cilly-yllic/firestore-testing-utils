/* eslint-disable  @typescript-eslint/no-var-requires */
const path = require('path')
const klawSync = require('klaw-sync')
const bo = require('@angular-devkit/build-optimizer')
const fs = require('fs-extra')
/* eslint-enable  @typescript-eslint/no-var-requires */

const ROOT = 'dist/'
const CJS_ROOT = ROOT + 'cjs/'
const ESM5_ROOT = ROOT + 'esm5/'
const TYPE_ROOT = ROOT + 'types/'

klawSync(ESM5_ROOT, {
  nodir: true,
  filter: function (item) {
    return item.path.endsWith('.js')
  },
})
  .map(item => item.path.slice(`${__dirname}/${ESM5_ROOT}`.length))
  .map(fileName => {
    if (!bo) return fileName
    let fullPath = path.resolve(__dirname, ESM5_ROOT, fileName)
    // The file won't exist when running build_test as we don't create the ESM5 sources
    if (!fs.existsSync(fullPath)) return fileName
    let content = fs.readFileSync(fullPath).toString()
    let transformed = bo.transformJavascript({
      content: content,
      getTransforms: [bo.getPrefixClassesTransformer, bo.getPrefixFunctionsTransformer, bo.getFoldFileTransformer],
    })
    fs.writeFileSync(fullPath, transformed.content)
    return fileName
  })

// remove umd.js/umd.d.ts files that are only needed for creation of the umd bundle
fs.removeSync(CJS_ROOT + '/internal/umd.js')
fs.removeSync(CJS_ROOT + '/internal/umd.js.map')
fs.removeSync(ESM5_ROOT + '/internal/umd.js')
fs.removeSync(ESM5_ROOT + '/internal/umd.js.map')
fs.removeSync(TYPE_ROOT + '/internal/umd.d.ts')
