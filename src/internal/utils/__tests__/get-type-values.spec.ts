import { getDb } from '../../../firestore/index.js'
import { PRIMITIVE_FIELD_TYPES, TypePattern } from '../../types/field-types.js'
import { getTypesValues } from '../common.js'
import { getFieldDefaultValues } from '../test.js'

describe(__filename, () => {
  it(`check string list`, async () => {
    const PATTERN: TypePattern = {
      string: {
        timestamp: PRIMITIVE_FIELD_TYPES.timestamp,
      },
      list: [
        {
          bool: PRIMITIVE_FIELD_TYPES.bool,
          list: [PRIMITIVE_FIELD_TYPES.latlng],
          path: PRIMITIVE_FIELD_TYPES.path,
        },
      ],
    }
    const db = await getDb()
    const defaultValues = getFieldDefaultValues(db)
    const LIST = {
      string: {
        timestamp: defaultValues.timestamp,
      },
      list: [
        {
          bool: defaultValues.bool,
          list: [defaultValues.latlng],
          path: defaultValues.path,
        },
      ],
    }
    expect(JSON.stringify(getTypesValues(PATTERN, db))).toBe(JSON.stringify(LIST))
  })
})
