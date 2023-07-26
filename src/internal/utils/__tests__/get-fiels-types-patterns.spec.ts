import { DocumentType, PRIMITIVE_FIELD_TYPES } from '../../types/field-types.js'
import { getFieldTypesPatterns } from '../common.js'

describe(__filename, () => {
  it(`type list check`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      string: [PRIMITIVE_FIELD_TYPES.string, PRIMITIVE_FIELD_TYPES.timestamp],
    }
    const LIST = [
      {
        string: PRIMITIVE_FIELD_TYPES.string,
      },
      {
        string: PRIMITIVE_FIELD_TYPES.timestamp,
      },
    ]
    expect(JSON.stringify(getFieldTypesPatterns(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })
  it(`type specific list check`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      string: [PRIMITIVE_FIELD_TYPES.string, 'foo'],
    }
    const LIST = [
      {
        string: PRIMITIVE_FIELD_TYPES.string,
      },
      {
        string: 'foo',
      },
    ]
    expect(JSON.stringify(getFieldTypesPatterns(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })
  it(`complicated check`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      string: [
        PRIMITIVE_FIELD_TYPES.string,
        {
          timestamp: [PRIMITIVE_FIELD_TYPES.timestamp],
        },
      ],
      'list[]': [
        PRIMITIVE_FIELD_TYPES.number,
        {
          boolean: [PRIMITIVE_FIELD_TYPES.boolean],
          'list[]': [PRIMITIVE_FIELD_TYPES.latlng],
          path: [PRIMITIVE_FIELD_TYPES.path],
        },
      ],
    }
    const LIST = [
      {
        string: PRIMITIVE_FIELD_TYPES.string,
        list: [PRIMITIVE_FIELD_TYPES.number],
      },
      {
        string: PRIMITIVE_FIELD_TYPES.string,
        list: [
          {
            boolean: PRIMITIVE_FIELD_TYPES.boolean,
            list: [PRIMITIVE_FIELD_TYPES.latlng],
            path: PRIMITIVE_FIELD_TYPES.path,
          },
        ],
      },
      {
        string: {
          timestamp: PRIMITIVE_FIELD_TYPES.timestamp,
        },
        list: [PRIMITIVE_FIELD_TYPES.number],
      },
      {
        string: {
          timestamp: PRIMITIVE_FIELD_TYPES.timestamp,
        },
        list: [
          {
            boolean: PRIMITIVE_FIELD_TYPES.boolean,
            list: [PRIMITIVE_FIELD_TYPES.latlng],
            path: PRIMITIVE_FIELD_TYPES.path,
          },
        ],
      },
    ]
    expect(JSON.stringify(getFieldTypesPatterns(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })
})
