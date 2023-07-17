/**
 * Alias subpath import (`dist/cjs/*`) to top-level path mapping (`rxjs/*`)
 * Previously this was done by placing cjs to top-level package when it's published -
 * Now build uses `dist` as explicit output subpath so we generate top-level alias here instead.
 */
/* eslint-disable  @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')
/* eslint-enable  @typescript-eslint/no-var-requires */

const aliasRoot = ['core', 'types']

aliasRoot
  .map(alias => path.resolve(__dirname, `../${alias}`))
  .forEach(alias => {
    if (fs.existsSync(alias)) {
      fs.removeSync(alias)
    }
    fs.ensureDirSync(alias)
  })

const PREFIX = 'dist'

aliasRoot.forEach(alias => {
  const relative = alias
    .split(/\//g)
    .map(() => '..')
    .join('/')
  const pkgManifest = {
    name: `@cilly-yllic/${alias.split(/\//g).join('-')}`,
    types: `${relative}/${PREFIX}/${alias}.d.ts`,
    main: `${relative}/${PREFIX}/${alias}.js`,
    sideEffects: false,
  }

  fs.writeJSON(path.resolve(__dirname, `../${alias}/package.json`), pkgManifest, { spaces: 2 })
})
