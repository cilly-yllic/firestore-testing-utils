import { getDb } from '../../../firestore/index.js'
import { PRIMITIVE_FIELD_TYPES, TypePattern } from '../../types/field-types.js'
import { getTypesValues } from '../common.js'
import { getFieldDefaultValues } from '../test.js'

describe('get type values', () => {
  it(`check string array`, async () => {
    const PATTERN: TypePattern = {
      string: {
        timestamp: PRIMITIVE_FIELD_TYPES.timestamp,
      },
      array: [
        {
          boolean: PRIMITIVE_FIELD_TYPES.boolean,
          array: [PRIMITIVE_FIELD_TYPES.geopoint],
          reference: PRIMITIVE_FIELD_TYPES.reference,
        },
      ],
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = {
      string: {
        timestamp: defaultValues.timestamp,
      },
      array: [
        {
          boolean: defaultValues.boolean,
          array: [defaultValues.geopoint],
          reference: defaultValues.reference,
        },
      ],
    }
    expect(JSON.stringify(getTypesValues(PATTERN, db))).toBe(JSON.stringify(LIST))
  })
})
