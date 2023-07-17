import { getDb } from '../../firestore/index.js'
import { getRecursiveRiteTypeValues } from '../index.js'
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

describe('get right type values', () => {
  it(`simple string`, async () => {
    const DOCUMENT_TYPE = {
      string: ARRAY,
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [
      { string: defaultValues.number },
      { string: defaultValues.boolean },
      { string: defaultValues.null },
      { string: defaultValues.timestamp },
      { string: defaultValues.geopoint },
      { string: defaultValues.reference },
    ]
    expect(JSON.stringify(getRecursiveRiteTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple array`, async () => {
    const DOCUMENT_TYPE = {
      'array[]': ARRAY,
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db, true)
    const LIST = [
      { array: [defaultValues.number] },
      { array: [defaultValues.boolean] },
      { array: [defaultValues.null] },
      { array: [defaultValues.timestamp] },
      { array: [defaultValues.geopoint] },
      { array: [defaultValues.reference] },
    ]
    expect(JSON.stringify(getRecursiveRiteTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple map`, async () => {
    const DOCUMENT_TYPE = {
      map: {
        number: PRIMITIVE_FIELD_TYPES.number,
      },
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [{ map: { number: defaultValues.number } }]
    expect(JSON.stringify(getRecursiveRiteTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })
})
