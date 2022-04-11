import { DocumentReference } from '@firebase/firestore'
import { GeoPoint, FieldValue } from 'firebase/firestore'
import { getDb } from '../../../firestore'
import { getTypeValue } from '../common'
import { PRIMITIVE_FIELD_TYPES } from '../../types/field-types'

describe('get value check', () => {
  it(`is ${PRIMITIVE_FIELD_TYPES.string}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.string)).toBe('hoge')
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.number}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.number)).toBe(1)
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.boolean}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.boolean)).toBe(true)
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.null}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.null)).toBe(null)
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.timestamp}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.timestamp) instanceof FieldValue).toBe(true)
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.geopoint}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.geopoint) instanceof GeoPoint).toBe(true)
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.reference}`, async () => {
    const db = await getDb()
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.reference, db) instanceof DocumentReference).toBe(true)
  })
})
