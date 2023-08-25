import { DocumentData } from 'firebase/firestore'

import { Firestore, DocumentType, PRIMITIVE_FIELD_TYPES, INCLUSIONS } from './types/firestore-field-types.js'
import { KeyTypePatterns } from './types/key-type-patterns.js'
import { KeyValues } from './types/key-type-values.js'
import { TYPE_VALUES } from './utils/firestore-type-values.js'

import {
  getKeyTypePatterns as _getKeyTypePatterns,
  convertTypeToValue as _convertTypeToValue,
  getRecursiveWrongTypes as _getRecursiveWrongTypes,
} from './index.js'

type Data = DocumentData
type KeyTypeConst = typeof PRIMITIVE_FIELD_TYPES

export const getRecursiveWrongTypes = (keyTypes: KeyTypePatterns<Data>) =>
  _getRecursiveWrongTypes<Data, KeyTypeConst>(keyTypes, PRIMITIVE_FIELD_TYPES, INCLUSIONS)
export const getKeyTypePatterns = (documentType: DocumentType) => _getKeyTypePatterns<Data>(documentType)
export const convertTypeToValue = (pattern: KeyTypePatterns<Data>, db: Firestore) =>
  _convertTypeToValue<Data>(pattern, TYPE_VALUES(db))

export const getRecursiveWrongTypeValues = (keyTypes: KeyTypePatterns<Data>, db: Firestore): KeyValues[] =>
  getRecursiveWrongTypes(keyTypes).map(obj => convertTypeToValue(obj, db))

export const getRecursiveRightTypeValues = (documentType: DocumentType, db: Firestore): KeyValues[] => {
  const patterns = getKeyTypePatterns(documentType)
  return patterns.map(pattern => convertTypeToValue(pattern, db))
}
