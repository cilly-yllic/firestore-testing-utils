import firebase from 'firebase/compat/app'
import { doc } from 'firebase/firestore'
import { getGeoPoint, getServerTimestamp } from './firestore'
import { collectionName, documentId, date } from '../types/field-types'

export const getFieldDefaultValues = (db: firebase.firestore.Firestore, isInArray = false) => ({
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
