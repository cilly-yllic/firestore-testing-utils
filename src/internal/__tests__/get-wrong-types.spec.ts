import { getRecursiveWrongTypes } from '../index.js'
import { PRIMITIVE_FIELD_TYPES, ALL_FIELD_TYPES } from '../types/field-types.js'

const ARRAY = [
  // PRIMITIVE_FIELD_TYPES.string,
  PRIMITIVE_FIELD_TYPES.number,
  PRIMITIVE_FIELD_TYPES.int,
  PRIMITIVE_FIELD_TYPES.float,
  PRIMITIVE_FIELD_TYPES.boolean,
  PRIMITIVE_FIELD_TYPES.null,
  PRIMITIVE_FIELD_TYPES.timestamp,
  PRIMITIVE_FIELD_TYPES.latlng,
  PRIMITIVE_FIELD_TYPES.path,
]

describe(__filename, () => {
  it(`simple string`, async () => {
    const DOCUMENT_TYPE = {
      string: ARRAY,
    }

    const LIST = [
      { string: PRIMITIVE_FIELD_TYPES.string },
      { string: ALL_FIELD_TYPES.map },
      { string: ALL_FIELD_TYPES.list },
    ]
    expect(JSON.stringify(getRecursiveWrongTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })

  it(`simple array`, async () => {
    const DOCUMENT_TYPE = {
      'list[]': ARRAY,
    }

    const LIST = [
      { list: PRIMITIVE_FIELD_TYPES.string },
      { list: PRIMITIVE_FIELD_TYPES.number },
      { list: PRIMITIVE_FIELD_TYPES.int },
      { list: PRIMITIVE_FIELD_TYPES.float },
      { list: PRIMITIVE_FIELD_TYPES.boolean },
      { list: PRIMITIVE_FIELD_TYPES.null },
      { list: PRIMITIVE_FIELD_TYPES.timestamp },
      { list: PRIMITIVE_FIELD_TYPES.latlng },
      { list: PRIMITIVE_FIELD_TYPES.path },
      { list: ALL_FIELD_TYPES.map },
      { list: [PRIMITIVE_FIELD_TYPES.string] },
      { list: [ALL_FIELD_TYPES.map] },
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
      { map: PRIMITIVE_FIELD_TYPES.int },
      { map: PRIMITIVE_FIELD_TYPES.float },
      { map: PRIMITIVE_FIELD_TYPES.boolean },
      { map: PRIMITIVE_FIELD_TYPES.null },
      { map: PRIMITIVE_FIELD_TYPES.timestamp },
      { map: PRIMITIVE_FIELD_TYPES.latlng },
      { map: PRIMITIVE_FIELD_TYPES.path },
      { map: ALL_FIELD_TYPES.list },

      { map: { number: PRIMITIVE_FIELD_TYPES.string } },
      { map: { number: PRIMITIVE_FIELD_TYPES.boolean } },
      { map: { number: PRIMITIVE_FIELD_TYPES.null } },
      { map: { number: PRIMITIVE_FIELD_TYPES.timestamp } },
      { map: { number: PRIMITIVE_FIELD_TYPES.latlng } },
      { map: { number: PRIMITIVE_FIELD_TYPES.path } },
      { map: { number: ALL_FIELD_TYPES.map } },
      { map: { number: ALL_FIELD_TYPES.list } },
    ]
    expect(JSON.stringify(getRecursiveWrongTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })
})
