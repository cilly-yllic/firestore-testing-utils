import { getTypesPatterns } from '../common'
import { DocumentType, PRIMITIVE_FIELD_TYPES } from '../../types/field-types'

describe('get types patterns', () => {
  it(`check`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      string: [
        PRIMITIVE_FIELD_TYPES.string,
        {
          timestamp: [PRIMITIVE_FIELD_TYPES.timestamp],
        },
      ],
      'array[]': [
        PRIMITIVE_FIELD_TYPES.number,
        {
          boolean: [PRIMITIVE_FIELD_TYPES.boolean],
          'array[]': [PRIMITIVE_FIELD_TYPES.geopoint],
          reference: [PRIMITIVE_FIELD_TYPES.reference],
        },
      ],
    }
    const LIST = [
      {
        string: PRIMITIVE_FIELD_TYPES.string,
        array: [PRIMITIVE_FIELD_TYPES.number],
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
    ]
    expect(JSON.stringify(getTypesPatterns(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })
})
