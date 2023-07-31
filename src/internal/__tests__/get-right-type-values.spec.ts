import { getDb } from '../../firestore/index.js'
import { getRecursiveRightTypeValues } from '../index.js'
import { PRIMITIVE_FIELD_TYPES } from '../types/field-types.js'
import { getFieldDefaultValues } from '../utils/test.js'

const ARRAY = [
  // PRIMITIVE_FIELD_TYPES.string,
  PRIMITIVE_FIELD_TYPES.number,
  PRIMITIVE_FIELD_TYPES.int,
  PRIMITIVE_FIELD_TYPES.float,
  PRIMITIVE_FIELD_TYPES.bool,
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
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [
      { string: defaultValues.number },
      { string: defaultValues.int },
      { string: defaultValues.float },
      { string: defaultValues.bool },
      { string: defaultValues.null },
      { string: defaultValues.timestamp },
      { string: defaultValues.latlng },
      { string: defaultValues.path },
    ]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple list`, async () => {
    const DOCUMENT_TYPE = {
      'list[]': ARRAY,
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db, true)
    const LIST = [
      { list: [defaultValues.number] },
      { list: [defaultValues.int] },
      { list: [defaultValues.float] },
      { list: [defaultValues.bool] },
      { list: [defaultValues.null] },
      { list: [defaultValues.timestamp] },
      { list: [defaultValues.latlng] },
      { list: [defaultValues.path] },
    ]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple map`, async () => {
    const DOCUMENT_TYPE = {
      map: {
        number: [PRIMITIVE_FIELD_TYPES.number, PRIMITIVE_FIELD_TYPES.string],
      },
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [{ map: { number: defaultValues.number } }, { map: { number: defaultValues.string } }]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })
})

describe(`${__filename} (specific)`, () => {
  it(`simple string (specific)`, async () => {
    const DOCUMENT_TYPE = {
      specific: ['foo'],
    }
    const db = await getDb()
    const LIST = [{ specific: 'foo' }]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })
  it(`simple strings (specific)`, async () => {
    const DOCUMENT_TYPE = {
      specific: [...ARRAY, 'foo'],
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [
      { specific: defaultValues.number },
      { specific: defaultValues.int },
      { specific: defaultValues.float },
      { specific: defaultValues.bool },
      { specific: defaultValues.null },
      { specific: defaultValues.timestamp },
      { specific: defaultValues.latlng },
      { specific: defaultValues.path },
      { specific: 'foo' },
    ]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple list (specific)`, async () => {
    const DOCUMENT_TYPE = {
      'list[]': ['foo'],
    }
    const db = await getDb()
    const LIST = [{ list: ['foo'] }]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple lists (specific)`, async () => {
    const DOCUMENT_TYPE = {
      'list[]': [...ARRAY, 'foo'],
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db, true)
    const LIST = [
      { list: [defaultValues.number] },
      { list: [defaultValues.int] },
      { list: [defaultValues.float] },
      { list: [defaultValues.bool] },
      { list: [defaultValues.null] },
      { list: [defaultValues.timestamp] },
      { list: [defaultValues.latlng] },
      { list: [defaultValues.path] },
      { list: ['foo'] },
    ]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple map (specific)`, async () => {
    const DOCUMENT_TYPE = {
      map: {
        specific: 'foo',
      },
    }
    const db = await getDb()
    const LIST = [{ map: { specific: 'foo' } }]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })

  it(`simple maps (specific)`, async () => {
    const DOCUMENT_TYPE = {
      map: {
        specific: ['foo', PRIMITIVE_FIELD_TYPES.number],
      },
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = [{ map: { specific: 'foo' } }, { map: { specific: defaultValues.number } }]
    expect(JSON.stringify(getRecursiveRightTypeValues(DOCUMENT_TYPE, db))).toBe(JSON.stringify(LIST))
  })
})
