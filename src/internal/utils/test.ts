import { doc } from 'firebase/firestore'

import { Firestore, collectionName, documentId, date } from '../types/field-types.js'

import { getGeoPoint, getServerTimestamp } from './firestore.js'

export const getFieldDefaultValues = (db: Firestore, isInArray = false) => ({
  string: 'hoge',
  number: 1,
  boolean: true,
  map: {},
  array: [],
  null: null,
  timestamp: isInArray ? date : getServerTimestamp(),
  geopoint: getGeoPoint(1, 1),
  reference: doc(db, collectionName, documentId),
})
