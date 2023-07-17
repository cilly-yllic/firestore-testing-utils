import { getDb } from '../../firestore/index.js'
import { getRecursiveWrongTypeValues } from '../index.js'
import { PRIMITIVE_FIELD_TYPES } from '../types/field-types.js'
import { getFieldDefaultValues } from '../utils/test.js'

const ARRAY = [
  // PRIMITIVE_FIELD_TYPES.string,
  PRIMITIVE_FIELD_TYPES.number,
  PRIMITIVE_FIELD_TYPES.boolean,
  PRIMITIVE_FIELD_TYPES.null,
  PRIMITIVE_FIELD_TYPES.timestamp,
  PRIMITIVE_FIELD_TYPES.geopoint,
  PRIMITIVE_FIELD_TYPES.reference,
]

describe('get wrong type values', () => {
  it(`simple string`, async () => {
    const DOCUMENT_TYPE = {
      string: ARRAY,
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [
      {
        string: defaultValues.string,
      },
      {
        string: defaultValues.map,
      },
      {
        string: defaultValues.array,
      },
    ]
    expect(JSON.stringify(getRecursiveWrongTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple array`, async () => {
    const DOCUMENT_TYPE = {
      'array[]': ARRAY,
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [
      { array: defaultValues.string },
      { array: defaultValues.number },
      { array: defaultValues.boolean },
      { array: defaultValues.null },
      { array: defaultValues.timestamp },
      { array: defaultValues.geopoint },
      { array: defaultValues.reference },
      { array: defaultValues.map },
      { array: [defaultValues.string] },
      { array: [defaultValues.map] },
    ]
    expect(JSON.stringify(getRecursiveWrongTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple map`, async () => {
    const DOCUMENT_TYPE = {
      map: {
        number: PRIMITIVE_FIELD_TYPES.number,
      },
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [
      { map: defaultValues.string },
      { map: defaultValues.number },
      { map: defaultValues.boolean },
      { map: defaultValues.null },
      { map: defaultValues.timestamp },
      { map: defaultValues.geopoint },
      { map: defaultValues.reference },
      { map: defaultValues.array },

      { map: { number: defaultValues.string } },
      { map: { number: defaultValues.boolean } },
      { map: { number: defaultValues.null } },
      { map: { number: defaultValues.timestamp } },
      { map: { number: defaultValues.geopoint } },
      { map: { number: defaultValues.reference } },
      { map: { number: defaultValues.map } },
      { map: { number: defaultValues.array } },
    ]
    expect(JSON.stringify(getRecursiveWrongTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })
})
