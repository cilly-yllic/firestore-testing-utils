import { doc } from 'firebase/firestore'

import {
  Firestore,
  collectionName,
  documentId,
  date,
  ALL_FIELD_TYPES,
  INCLUSIONS,
  AllFieldTypes,
  DocumentType,
  TypePattern,
  PatternType,
  FieldType,
  PrimitiveFieldTypes,
  Value,
  PathType,
  TypeValue,
  FieldMap,
} from '../types/field-types.js'

import { getGeoPoint, getServerTimestamp } from './firestore.js'
import { isObject, isArray } from './types.js'

export const getTypeValue = (type: AllFieldTypes, db?: Firestore, isInArray = false): Value => {
  if (!type) {
    throw new Error('need type')
  }
  switch (type) {
    case ALL_FIELD_TYPES.string:
      return 'hoge'
    case ALL_FIELD_TYPES.int:
      return 1
    case ALL_FIELD_TYPES.float:
      return 1.1
    case ALL_FIELD_TYPES.number:
      return -1
    case ALL_FIELD_TYPES.boolean:
      return true
    case ALL_FIELD_TYPES.map:
      return {}
    case ALL_FIELD_TYPES.list:
      return []
    case ALL_FIELD_TYPES.null:
      return null
    case ALL_FIELD_TYPES.timestamp:
      return isInArray ? date : getServerTimestamp()
    case ALL_FIELD_TYPES.latlng:
      return getGeoPoint(1, 1)
    case ALL_FIELD_TYPES.path:
      if (!db) {
        throw new Error('need db')
      }
      return doc(db, collectionName, documentId)
    default:
      return type
  }
}

export const hasKey = (pattern: TypePattern, path: string) => {
  if (!isObject(pattern)) {
    return false
  }
  let current = copy(pattern)
  for (const key of path.split('.')) {
    if (!isObject(current)) {
      return false
    }
    if (!(key in (current || {}))) {
      return false
    }
    current = current[key]
  }
  return true
}

export const getLeftTypes = (types: AllFieldTypes[]): AllFieldTypes[] =>
  Object.values(ALL_FIELD_TYPES).filter(TYPE => {
    if (TYPE in INCLUSIONS && INCLUSIONS[TYPE].length > 0) {
      return types.every(type => !INCLUSIONS[TYPE].includes(type))
    }
    return types.every(type => TYPE !== type)
  })
export const getLeftTypeValues = (types: AllFieldTypes[], db?: Firestore): Value[] =>
  getLeftTypes(types).map(TYPE => getTypeValue(TYPE, db))

export const getUnique = <T extends string | number>(list: T[]): T[] => [...new Set(list)]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const copy = (data: any) => JSON.parse(JSON.stringify(data))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>
export const updateObjProp = (obj: Obj, value: string, propPath: string) => {
  const [head, ...rest] = propPath.split('.')
  const key = head.replace(/\[\]$/, '')
  const _isArray = head.endsWith('[]')
  if (!rest.length) {
    obj[key] = _isArray ? [value] : value
  } else {
    const _value = _isArray ? obj[key][0] : obj[key]
    updateObjProp(_value, value, rest.join('.'))
  }
}

const removeListSuffix = (str: string) => str.replace(/\[\]$/, '')

export const getFieldTypesPatterns = (fieldTypes: DocumentType | FieldType | FieldType[]): FieldType[] => {
  let typePatterns: FieldType[] = []
  if (isArray(fieldTypes)) {
    for (const fieldType of fieldTypes as FieldType[]) {
      for (const pattern of getFieldTypesPatterns(fieldType)) {
        typePatterns.push(pattern)
      }
    }
    return typePatterns
  }
  if (isObject(fieldTypes)) {
    for (const [field, fieldType] of Object.entries(fieldTypes as FieldMap)) {
      const patterns = []
      for (const _fieldType of getFieldTypesPatterns(fieldType)) {
        patterns.push(_fieldType)
      }
      if (!typePatterns.length) {
        for (const pattern of patterns) {
          typePatterns.push({
            [removeListSuffix(field)]: field.endsWith('[]') ? [pattern] : pattern,
          })
        }
      } else {
        const mergedTypePatterns: FieldType[] = []
        for (const typePattern of typePatterns) {
          for (const pattern of patterns) {
            mergedTypePatterns.push({
              ...(typePattern as FieldMap),
              [removeListSuffix(field)]: field.endsWith('[]') ? [pattern] : pattern,
            })
          }
        }
        typePatterns = mergedTypePatterns
      }
    }
    return typePatterns
  }
  return [fieldTypes as FieldType]
}

export const getTypesValues = (pattern: TypePattern, db?: Firestore, isInArray = false): TypeValue | TypePattern => {
  return Object.entries(pattern).reduce((objectAcc: TypeValue | TypePattern, [fieldName, types]) => {
    let values
    if (isObject(types)) {
      values = getTypesValues(types as DocumentType, db)
    } else if (isArray(types)) {
      const type = (types as PatternType[])[0] as FieldType
      values = [
        isObject(type)
          ? getTypesValues(type as DocumentType, db, true)
          : getTypeValue(type as PrimitiveFieldTypes, db, true),
      ]
    } else {
      values = getTypeValue(types as PrimitiveFieldTypes, db, isInArray)
    }
    objectAcc[fieldName] = values
    return objectAcc
  }, {})
}

// TODO MS (more simple) & rename to [getAllTheOtherFieldTypes]
export const getAllPathTypes = (documentType: DocumentType, path = ''): PathType[] => {
  return Object.entries(documentType).reduce((acc: PathType[], [fieldName, _types]) => {
    const currentPath = `${path}.${fieldName}`.replace(/^\./, '')
    const types = (isArray(_types) ? _types : [_types]) as FieldType[]

    const { primitiveTypes, objectTypes } = types.reduce(
      (typesAcc: { primitiveTypes: PrimitiveFieldTypes[]; objectTypes: DocumentType[] }, type) => {
        if (isObject(type)) {
          typesAcc.objectTypes.push(type as DocumentType)
        } else {
          typesAcc.primitiveTypes.push(type as PrimitiveFieldTypes)
        }
        return typesAcc
      },
      { primitiveTypes: [], objectTypes: [] }
    )
    if (objectTypes.length) {
      primitiveTypes.push(ALL_FIELD_TYPES.map)
    }
    if (fieldName.endsWith('[]')) {
      primitiveTypes.push(ALL_FIELD_TYPES.list)
      acc = acc.concat(
        getLeftTypes([ALL_FIELD_TYPES.list]).map(type => ({ path: currentPath.replace(/\[\]$/, ''), type }))
      )
    }

    acc = acc.concat(getLeftTypes(primitiveTypes).map(type => ({ path: currentPath, type })))
    acc = acc.concat(
      objectTypes.reduce((objectTypeAcc: PathType[], objectType) => {
        return objectTypeAcc.concat(getAllPathTypes(objectType, currentPath))
      }, [])
    )
    return acc
  }, [])
}
