import { readFileSync } from 'fs'
import { join } from 'path'
import { v4 as randomStr } from 'uuid'
import * as firebase from '@firebase/rules-unit-testing'
export const PROJECT_ID = randomStr()
export const collectionName = randomStr()
export const uid = randomStr()

export const rules = readFileSync(join(__dirname, 'firestore.rules'), 'utf8')
// ルールを読み込み
export const env = firebase.initializeTestEnvironment({ projectId: PROJECT_ID, firestore: { rules } })
export const getDb = async () => (await env).authenticatedContext(uid).firestore()
