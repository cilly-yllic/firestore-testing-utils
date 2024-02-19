#!/usr/bin/env zx
import { fs } from 'zx'
import packageJson from './../../package.json'
import npmPackageJson from './../../package.npm.json'

const IGNORE_KEYS = ['publishConfig']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = Record<string, any>

const run = async () => {
  const exports: Json = {}
  for (const [key, value] of Object.entries(packageJson)) {
    if (IGNORE_KEYS.includes(key)) {
      continue
    }
    exports[key] = value
  }
  for (const [key, value] of Object.entries(npmPackageJson)) {
    exports[key] = value
  }
  fs.writeFileSync('package.json', JSON.stringify(exports, null, 2), { encoding: 'utf-8' })
}

run().then(version => {
  return version
})
