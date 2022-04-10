import firebase from 'firebase/compat/app'
import {
  getTypesPatterns,
  getDeepestPattern,
  getAllPathTypes,
  updateObjProp,
  copy,
  getTypesValues,
} from './utils/common'
import { DocumentType, TypePattern } from './types/field-types'

export const getRecursiveWrongTypes = (documentType: DocumentType) => {
  const patterns = getTypesPatterns(documentType) as TypePattern[]
  const pattern = getDeepestPattern(patterns)
  const types = getAllPathTypes(documentType)
  return types.map(({ path, type }) => {
    const _pattern = copy(pattern.pattern)
    updateObjProp(_pattern, type, path)
    return _pattern
  })
}

export const getRecursiveWrongTypeValues = (documentType: DocumentType, db: firebase.firestore.Firestore) =>
  getRecursiveWrongTypes(documentType).map(obj => getTypesValues(obj, db))
export const getRecursiveRiteTypeValues = (documentType: DocumentType, db: firebase.firestore.Firestore) => {
  const patterns = getTypesPatterns(documentType) as TypePattern[]
  return patterns.map(pattern => getTypesValues(pattern, db))
}
