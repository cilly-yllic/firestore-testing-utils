import { Firestore, DocumentType, AllFieldTypes, TypePattern, TypeValue, Value } from './types/field-types.js'
import {
  getTypeValue as _getTypeValue,
  getTypesValues as _getTypesValues,
  getTypesPatterns as _getTypesPatterns,
  getDeepestPattern,
  getAllPathTypes,
  updateObjProp,
  copy,
} from './utils/common.js'

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

export const getTypeValue = (type: AllFieldTypes, db: Firestore): Value => _getTypeValue(type, db) as Value
export const getTypesValues = (pattern: TypePattern, db: Firestore): TypeValue =>
  _getTypesValues(pattern, db) as TypeValue
export const getTypesPatterns = (documentType: DocumentType): TypePattern[] =>
  _getTypesPatterns(documentType) as TypePattern[]

export const getRecursiveWrongTypeValues = (documentType: DocumentType, db: Firestore): TypeValue[] =>
  getRecursiveWrongTypes(documentType).map(obj => getTypesValues(obj, db))

export const getRecursiveRiteTypeValues = (documentType: DocumentType, db: Firestore): TypeValue[] => {
  const patterns = getTypesPatterns(documentType) as TypePattern[]
  return patterns.map(pattern => getTypesValues(pattern, db))
}
