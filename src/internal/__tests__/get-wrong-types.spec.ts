import { DocumentData } from 'firebase/firestore'

import { getRecursiveWrongTypes } from '../index.js'
import { ALL_FIELD_TYPES, INCLUSIONS } from '../types/firestore-field-types.js'
import { REQUIRED_TYPES } from '../types/types'

type Data = DocumentData
type KeyTypeConst = typeof ALL_FIELD_TYPES

const ARRAY = [
  // PRIMITIVE_FIELD_TYPES.string,
  ALL_FIELD_TYPES.number,
  ALL_FIELD_TYPES.int,
  ALL_FIELD_TYPES.float,
  ALL_FIELD_TYPES.bool,
  ALL_FIELD_TYPES.null,
  ALL_FIELD_TYPES.timestamp,
  ALL_FIELD_TYPES.latlng,
  ALL_FIELD_TYPES.path,
]

describe(__filename, () => {
  it(`simple string`, async () => {
    const DOCUMENT_TYPE = {
      string: ARRAY,
    }

    const LIST = [{ string: ALL_FIELD_TYPES.string }, { string: REQUIRED_TYPES.map }, { string: REQUIRED_TYPES.list }]
    expect(JSON.stringify(getRecursiveWrongTypes<Data, KeyTypeConst>(DOCUMENT_TYPE, ALL_FIELD_TYPES, INCLUSIONS))).toBe(
      JSON.stringify(LIST)
    )
  })

  it(`simple array`, async () => {
    const DOCUMENT_TYPE = {
      'list[]': ARRAY,
    }

    const LIST = [
      { list: ALL_FIELD_TYPES.string },
      { list: ALL_FIELD_TYPES.number },
      { list: ALL_FIELD_TYPES.int },
      { list: ALL_FIELD_TYPES.float },
      { list: ALL_FIELD_TYPES.bool },
      { list: ALL_FIELD_TYPES.null },
      { list: ALL_FIELD_TYPES.timestamp },
      { list: ALL_FIELD_TYPES.latlng },
      { list: ALL_FIELD_TYPES.path },
      { list: REQUIRED_TYPES.map },
      { list: [ALL_FIELD_TYPES.string] },
      { list: [REQUIRED_TYPES.map] },
    ]
    expect(JSON.stringify(getRecursiveWrongTypes<Data, KeyTypeConst>(DOCUMENT_TYPE, ALL_FIELD_TYPES, INCLUSIONS))).toBe(
      JSON.stringify(LIST)
    )
  })

  it(`simple map`, async () => {
    const DOCUMENT_TYPE = {
      map: {
        number: ALL_FIELD_TYPES.number,
      },
    }

    const LIST = [
      { map: ALL_FIELD_TYPES.string },
      { map: ALL_FIELD_TYPES.number },
      { map: ALL_FIELD_TYPES.int },
      { map: ALL_FIELD_TYPES.float },
      { map: ALL_FIELD_TYPES.bool },
      { map: ALL_FIELD_TYPES.null },
      { map: ALL_FIELD_TYPES.timestamp },
      { map: ALL_FIELD_TYPES.latlng },
      { map: ALL_FIELD_TYPES.path },
      { map: REQUIRED_TYPES.list },

      { map: { number: ALL_FIELD_TYPES.string } },
      { map: { number: ALL_FIELD_TYPES.bool } },
      { map: { number: ALL_FIELD_TYPES.null } },
      { map: { number: ALL_FIELD_TYPES.timestamp } },
      { map: { number: ALL_FIELD_TYPES.latlng } },
      { map: { number: ALL_FIELD_TYPES.path } },
      { map: { number: REQUIRED_TYPES.map } },
      { map: { number: REQUIRED_TYPES.list } },
    ]
    expect(JSON.stringify(getRecursiveWrongTypes<Data, KeyTypeConst>(DOCUMENT_TYPE, ALL_FIELD_TYPES, INCLUSIONS))).toBe(
      JSON.stringify(LIST)
    )
  })
})
