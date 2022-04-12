import firebase from 'firebase/compat/app'
import '@firebase/rules-unit-testing'
import { doc } from 'firebase/firestore'
import { getGeoPoint, getServerTimestamp } from './firestore'
import { isObject, isArray } from './types'
import {
  collectionName,
  documentId,
  date,
  ALL_FIELD_TYPES,
  AllFieldTypes,
  DocumentType,
  TypePattern,
  FieldType,
  PrimitiveFieldTypes,
  Value,
  PathType,
  TypeValue,
  DeepestPattern,
} from '../types/field-types'

export const getTypeValue = (type: AllFieldTypes, db?: firebase.firestore.Firestore, isInArray = false): Value => {
  if (!type) {
    throw new Error('need type')
  }
  switch (type) {
    default:
    case ALL_FIELD_TYPES.string:
      return 'hoge'
    case ALL_FIELD_TYPES.number:
      return 1
    case ALL_FIELD_TYPES.boolean:
      return true
    case ALL_FIELD_TYPES.map:
      return {}
    case ALL_FIELD_TYPES.array:
      return []
    case ALL_FIELD_TYPES.null:
      return null
    case ALL_FIELD_TYPES.timestamp:
      return isInArray ? date : getServerTimestamp()
    // return 'timestampValue'
    case ALL_FIELD_TYPES.geopoint:
      return getGeoPoint(1, 1)
    // return 'geopointValue'
    case ALL_FIELD_TYPES.reference:
      if (!db) {
        throw new Error('need db')
      }
      return doc(db, collectionName, documentId)
    // return 'referenceValue'
  }
}

export const getLeftTypes = (types: AllFieldTypes[]): AllFieldTypes[] =>
  Object.values(ALL_FIELD_TYPES).filter(TYPE => types.every(type => TYPE !== type))
export const getLeftTypeValues = (types: AllFieldTypes[], db?: firebase.firestore.Firestore): Value[] =>
  getLeftTypes(types).map(TYPE => getTypeValue(TYPE, db))

export const getUnique = <T extends string | number>(list: T[]): T[] => [...new Set(list)]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const copy = (data: any) => JSON.parse(JSON.stringify(data))

export const updateObjProp = (obj, value, propPath) => {
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

// some how idea shows type error, but jest accept this method. then i just leave this.
export const getTypesPatterns = (documentType: DocumentType): TypePattern[] | [FieldType] => {
  return Object.entries(documentType).reduce((objectsAcc: TypePattern[], [fieldName, _types]) => {
    const types = (isArray(_types) ? _types : [_types]) as FieldType[]
    const patterns = types.reduce((typesAcc: TypePattern[], type) => {
      const pattern = isObject(type) ? (getTypesPatterns(type as DocumentType)[0] as FieldType) : type
      typesAcc.push({ [fieldName.replace(/\[\]$/, '')]: fieldName.endsWith('[]') ? [pattern] : pattern })
      return typesAcc
    }, [])
    if (objectsAcc.length) {
      objectsAcc = objectsAcc.reduce((acc: TypePattern[], obj) => {
        patterns.forEach(pattern => {
          Object.entries(pattern).forEach(([key, value]) => {
            obj[key.replace(/\[\]$/, '')] = value
          })
          acc.push(copy(obj))
        })
        return acc
      }, [])
    } else {
      objectsAcc = patterns
    }
    return objectsAcc
  }, [])
}

export const getTypesValues = (
  pattern: TypePattern,
  db?: firebase.firestore.Firestore,
  isInArray = false
): TypeValue | TypePattern => {
  return Object.entries(pattern).reduce((objectAcc: TypeValue | TypePattern, [fieldName, types]) => {
    let values
    if (isObject(types)) {
      values = getTypesValues(types as DocumentType, db)
    } else if (isArray(types)) {
      const type = types[0] as FieldType
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
      primitiveTypes.push(ALL_FIELD_TYPES.array)
      acc = acc.concat(
        getLeftTypes([ALL_FIELD_TYPES.array]).map(type => ({ path: currentPath.replace(/\[\]$/, ''), type }))
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

export const getObjectCount = (pattern: TypePattern) => {
  return Object.entries(pattern).reduce((acc, [fieldName, type]) => {
    if (isObject(type)) {
      acc++
      acc += getObjectCount(type as TypePattern)
    } else if (isArray(type) && isObject(type[0])) {
      acc++
      acc += getObjectCount(type[0] as TypePattern)
    }
    return acc
  }, 0)
}

export const getDeepestPattern = (patterns: TypePattern[]): DeepestPattern => {
  return patterns.reduce(
    (acc: DeepestPattern, pattern, index) => {
      const count = getObjectCount(pattern)
      if (count >= acc.count) {
        acc = {
          index,
          count,
          pattern,
        }
      }
      return acc
    },
    { index: -1, count: 0, pattern: {} }
  )
}
