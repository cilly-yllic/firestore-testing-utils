import { Firestore, DocumentType, TypePattern, TypeValue } from './types/field-types.js'
import { getTypesValues, getAllPathTypes, updateObjProp, copy, getFieldTypesPatterns, hasKey } from './utils/common.js'

export { getTypeValue, getTypesValues, getFieldTypesPatterns } from './utils/common.js'

export const getRecursiveWrongTypes = (documentType: DocumentType) => {
  const patterns = getFieldTypesPatterns(documentType) as TypePattern[]
  const types = getAllPathTypes(documentType)
  const list: TypePattern[] = []
  for (const pattern of patterns) {
    for (const { path, type } of types) {
      if (!hasKey(pattern, path.replace(/\[\]$/, ''))) {
        continue
      }
      const _pattern = copy(pattern)
      updateObjProp(_pattern, type, path)
      list.push(_pattern)
    }
  }
  return list.filter(
    (pattern, index) => list.findIndex(_pattern => JSON.stringify(_pattern) === JSON.stringify(pattern)) === index
  )
}

export const getRecursiveWrongTypeValues = (documentType: DocumentType, db: Firestore): TypeValue[] =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRecursiveWrongTypes(documentType).map(obj => getTypesValues(obj, db))

export const getRecursiveRightTypeValues = (documentType: DocumentType, db: Firestore): TypeValue[] => {
  const patterns = getFieldTypesPatterns(documentType) as TypePattern[]
  return patterns.map(pattern => getTypesValues(pattern, db))
}
