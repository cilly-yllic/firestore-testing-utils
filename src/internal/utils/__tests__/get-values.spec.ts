import { DocumentReference } from '@firebase/firestore'
import { GeoPoint, FieldValue } from 'firebase/firestore'

import { getDb } from '../../../firestore/index.js'
import { PRIMITIVE_FIELD_TYPES } from '../../types/field-types.js'
import { getTypeValue } from '../common.js'

describe(__filename, () => {
  it(`is ${PRIMITIVE_FIELD_TYPES.string}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.string)).toBe('hoge')
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.number}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.number)).toBe(-1)
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.int}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.int)).toBe(1)
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.float}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.float)).toBe(1.1)
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
  it(`is ${PRIMITIVE_FIELD_TYPES.latlng}`, () => {
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.latlng) instanceof GeoPoint).toBe(true)
  })
  it(`is ${PRIMITIVE_FIELD_TYPES.path}`, async () => {
    const db = await getDb()
    expect(getTypeValue(PRIMITIVE_FIELD_TYPES.path, db) instanceof DocumentReference).toBe(true)
  })
  it(`is specific`, async () => {
    const db = await getDb()
    expect(getTypeValue('specific', db)).toBe('specific')
  })
})
