import { GeoPoint, FieldValue, DocumentReference, DocumentData } from 'firebase/firestore'
import { v4 as randomStr } from 'uuid'

export const collectionName = randomStr()
export const documentId = randomStr()
export const date = new Date()

export const PRIMITIVE_FIELD_TYPES = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
  null: 'null',
  timestamp: 'timestamp',
  geopoint: 'geopoint',
  reference: 'reference',
}
export const ALL_FIELD_TYPES = {
  ...PRIMITIVE_FIELD_TYPES,
  map: 'map',
  array: 'array',
}

export type PrimitiveFieldTypes = typeof PRIMITIVE_FIELD_TYPES[keyof typeof PRIMITIVE_FIELD_TYPES]
export type AllFieldTypes = typeof ALL_FIELD_TYPES[keyof typeof ALL_FIELD_TYPES]
export type FieldType = PrimitiveFieldTypes | FieldMap

export interface FieldMap {
  [fieldName: string]: FieldType | FieldType[]
}
export type DocumentType = FieldMap

export type PatternType = AllFieldTypes | PatternMap
export type PatternMap = TypePattern
export interface TypePattern {
  [fieldName: string]: PatternType | PatternType[]
}
export interface PathType {
  path: string
  type: AllFieldTypes
}

export interface DeepestPattern {
  index: number
  count: number
  pattern: TypePattern
}

export type Value =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | []
  | null
  | FieldValue
  | Date
  | GeoPoint
  | DocumentReference<DocumentData>

export interface TypeValue {
  [fieldName: string]: Value | Value[] | TypeValue
}
