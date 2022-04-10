import { getObjectCount } from '../common'
import { PRIMITIVE_FIELD_TYPES, TypePattern } from '../../types/field-types'

describe('get object count', () => {
  it(`check`, async () => {
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
    expect(getObjectCount(PATTERN)).toBe(2)
  })
})
