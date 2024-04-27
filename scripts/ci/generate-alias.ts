import { resolve, join } from 'path'

import { getAliases, writePackageJson } from 'my-gadgetry/dev-ops/package-generator/generate-alias'
import { name } from 'package.json'

const PACKAGE_NAMES = name.split('/')
const HEAD = PACKAGE_NAMES.shift()
const AUTHOR_NAME = PACKAGE_NAMES.length ? HEAD || '@cilly' : '@cilly'
const PACKAGE_NAME = PACKAGE_NAMES.length ? PACKAGE_NAMES.join('-') : HEAD || ''
const ROOT_PATH = resolve()
const SRC_DIR = 'src'
const OUTPUT_DIR = 'lib'

const aliases = getAliases(join(ROOT_PATH, SRC_DIR), ['^firestore', '^internal', '\\.json$'])
writePackageJson(ROOT_PATH, AUTHOR_NAME, PACKAGE_NAME, OUTPUT_DIR, aliases)
