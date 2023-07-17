import { PRIMITIVE_FIELD_TYPES, TypePattern, DeepestPattern } from '../../types/field-types.js'
import { getDeepestPattern } from '../common.js'

describe('get deepest pattern', () => {
  it(`check`, async () => {
    const PATTERN: TypePattern[] = [
      {
        string: PRIMITIVE_FIELD_TYPES.string,
        array: [PRIMITIVE_FIELD_TYPES.number],
      },
      {
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
      },
      {
        string: PRIMITIVE_FIELD_TYPES.string,
        array: [
          {
            boolean: PRIMITIVE_FIELD_TYPES.boolean,
            array: [PRIMITIVE_FIELD_TYPES.geopoint],
            reference: PRIMITIVE_FIELD_TYPES.reference,
          },
        ],
      },
      {
        string: {
          timestamp: PRIMITIVE_FIELD_TYPES.timestamp,
        },
        array: [PRIMITIVE_FIELD_TYPES.number],
      },
    ]

    const DEEPEST_PATTERN: DeepestPattern = {
      index: 1,
      count: 2,
      pattern: PATTERN[1],
    }
    expect(JSON.stringify(getDeepestPattern(PATTERN))).toBe(JSON.stringify(DEEPEST_PATTERN))
  })
})
