import { DocumentType, ALL_FIELD_TYPES, PRIMITIVE_FIELD_TYPES, PathType } from '../../types/field-types.js'
import { getAllPathTypes } from '../common.js'

describe('get all path types', () => {
  it(`check simple array`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      'array[]': [PRIMITIVE_FIELD_TYPES.string],
    }
    const LIST: PathType[] = [
      { path: 'array', type: ALL_FIELD_TYPES.string },
      { path: 'array', type: ALL_FIELD_TYPES.number },
      { path: 'array', type: ALL_FIELD_TYPES.boolean },
      { path: 'array', type: ALL_FIELD_TYPES.null },
      { path: 'array', type: ALL_FIELD_TYPES.timestamp },
      { path: 'array', type: ALL_FIELD_TYPES.geopoint },
      { path: 'array', type: ALL_FIELD_TYPES.reference },
      { path: 'array', type: ALL_FIELD_TYPES.map },
      // { path: 'array', value: defaultValues.string },
      { path: 'array[]', type: ALL_FIELD_TYPES.number },
      { path: 'array[]', type: ALL_FIELD_TYPES.boolean },
      { path: 'array[]', type: ALL_FIELD_TYPES.null },
      { path: 'array[]', type: ALL_FIELD_TYPES.timestamp },
      { path: 'array[]', type: ALL_FIELD_TYPES.geopoint },
      { path: 'array[]', type: ALL_FIELD_TYPES.reference },
      { path: 'array[]', type: ALL_FIELD_TYPES.map },
    ]
    expect(JSON.stringify(getAllPathTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })

  it(`check simple map`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      map: [
        {
          string: [PRIMITIVE_FIELD_TYPES.string],
        },
      ],
    }
    const LIST: PathType[] = [
      { path: 'map', type: ALL_FIELD_TYPES.string },
      { path: 'map', type: ALL_FIELD_TYPES.number },
      { path: 'map', type: ALL_FIELD_TYPES.boolean },
      { path: 'map', type: ALL_FIELD_TYPES.null },
      { path: 'map', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map', type: ALL_FIELD_TYPES.geopoint },
      { path: 'map', type: ALL_FIELD_TYPES.reference },
      { path: 'map', type: ALL_FIELD_TYPES.array },

      { path: 'map.string', type: ALL_FIELD_TYPES.number },
      { path: 'map.string', type: ALL_FIELD_TYPES.boolean },
      { path: 'map.string', type: ALL_FIELD_TYPES.null },
      { path: 'map.string', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map.string', type: ALL_FIELD_TYPES.geopoint },
      { path: 'map.string', type: ALL_FIELD_TYPES.reference },
      { path: 'map.string', type: ALL_FIELD_TYPES.map },
      { path: 'map.string', type: ALL_FIELD_TYPES.array },
    ]
    expect(JSON.stringify(getAllPathTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })

  it(`check map.array`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      map: [
        {
          'array[]': [PRIMITIVE_FIELD_TYPES.string],
        },
      ],
    }
    const LIST: PathType[] = [
      { path: 'map', type: ALL_FIELD_TYPES.string },
      { path: 'map', type: ALL_FIELD_TYPES.number },
      { path: 'map', type: ALL_FIELD_TYPES.boolean },
      { path: 'map', type: ALL_FIELD_TYPES.null },
      { path: 'map', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map', type: ALL_FIELD_TYPES.geopoint },
      { path: 'map', type: ALL_FIELD_TYPES.reference },
      { path: 'map', type: ALL_FIELD_TYPES.array },

      { path: 'map.array', type: ALL_FIELD_TYPES.string },
      { path: 'map.array', type: ALL_FIELD_TYPES.number },
      { path: 'map.array', type: ALL_FIELD_TYPES.boolean },
      { path: 'map.array', type: ALL_FIELD_TYPES.null },
      { path: 'map.array', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map.array', type: ALL_FIELD_TYPES.geopoint },
      { path: 'map.array', type: ALL_FIELD_TYPES.reference },
      { path: 'map.array', type: ALL_FIELD_TYPES.map },

      { path: 'map.array[]', type: ALL_FIELD_TYPES.number },
      { path: 'map.array[]', type: ALL_FIELD_TYPES.boolean },
      { path: 'map.array[]', type: ALL_FIELD_TYPES.null },
      { path: 'map.array[]', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map.array[]', type: ALL_FIELD_TYPES.geopoint },
      { path: 'map.array[]', type: ALL_FIELD_TYPES.reference },
      { path: 'map.array[]', type: ALL_FIELD_TYPES.map },
    ]
    expect(JSON.stringify(getAllPathTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })
})
