import { getRecursiveWrongTypes } from '../index.js'
import { PRIMITIVE_FIELD_TYPES, ALL_FIELD_TYPES } from '../types/field-types.js'

const ARRAY = [
  // PRIMITIVE_FIELD_TYPES.string,
  PRIMITIVE_FIELD_TYPES.number,
  PRIMITIVE_FIELD_TYPES.boolean,
  PRIMITIVE_FIELD_TYPES.null,
  PRIMITIVE_FIELD_TYPES.timestamp,
  PRIMITIVE_FIELD_TYPES.geopoint,
  PRIMITIVE_FIELD_TYPES.reference,
]

describe('get wrong types', () => {
  it(`simple string`, async () => {
    const DOCUMENT_TYPE = {
      string: ARRAY,
    }

    const LIST = [
      { string: PRIMITIVE_FIELD_TYPES.string },
      { string: ALL_FIELD_TYPES.map },
      { string: ALL_FIELD_TYPES.array },
    ]
    expect(JSON.stringify(getRecursiveWrongTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })

  it(`simple array`, async () => {
    const DOCUMENT_TYPE = {
      'array[]': ARRAY,
    }

    const LIST = [
      { array: PRIMITIVE_FIELD_TYPES.string },
      { array: PRIMITIVE_FIELD_TYPES.number },
      { array: PRIMITIVE_FIELD_TYPES.boolean },
      { array: PRIMITIVE_FIELD_TYPES.null },
      { array: PRIMITIVE_FIELD_TYPES.timestamp },
      { array: PRIMITIVE_FIELD_TYPES.geopoint },
      { array: PRIMITIVE_FIELD_TYPES.reference },
      { array: ALL_FIELD_TYPES.map },
      { array: [PRIMITIVE_FIELD_TYPES.string] },
      { array: [ALL_FIELD_TYPES.map] },
    ]
    expect(JSON.stringify(getRecursiveWrongTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })

  it(`simple map`, async () => {
    const DOCUMENT_TYPE = {
      map: {
        number: PRIMITIVE_FIELD_TYPES.number,
      },
    }

    const LIST = [
      { map: PRIMITIVE_FIELD_TYPES.string },
      { map: PRIMITIVE_FIELD_TYPES.number },
      { map: PRIMITIVE_FIELD_TYPES.boolean },
      { map: PRIMITIVE_FIELD_TYPES.null },
      { map: PRIMITIVE_FIELD_TYPES.timestamp },
      { map: PRIMITIVE_FIELD_TYPES.geopoint },
      { map: PRIMITIVE_FIELD_TYPES.reference },
      { map: ALL_FIELD_TYPES.array },

      { map: { number: PRIMITIVE_FIELD_TYPES.string } },
      { map: { number: PRIMITIVE_FIELD_TYPES.boolean } },
      { map: { number: PRIMITIVE_FIELD_TYPES.null } },
      { map: { number: PRIMITIVE_FIELD_TYPES.timestamp } },
      { map: { number: PRIMITIVE_FIELD_TYPES.geopoint } },
      { map: { number: PRIMITIVE_FIELD_TYPES.reference } },
      { map: { number: ALL_FIELD_TYPES.map } },
      { map: { number: ALL_FIELD_TYPES.array } },
    ]
    expect(JSON.stringify(getRecursiveWrongTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })
})
