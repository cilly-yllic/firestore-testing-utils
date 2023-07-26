import { DocumentType, ALL_FIELD_TYPES, PRIMITIVE_FIELD_TYPES, PathType } from '../../types/field-types.js'
import { getAllPathTypes } from '../common.js'

describe(__filename, () => {
  it(`check simple array`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      'list[]': [PRIMITIVE_FIELD_TYPES.string],
    }
    const LIST: PathType[] = [
      { path: 'list', type: ALL_FIELD_TYPES.string },
      { path: 'list', type: ALL_FIELD_TYPES.number },
      { path: 'list', type: ALL_FIELD_TYPES.int },
      { path: 'list', type: ALL_FIELD_TYPES.float },
      { path: 'list', type: ALL_FIELD_TYPES.boolean },
      { path: 'list', type: ALL_FIELD_TYPES.null },
      { path: 'list', type: ALL_FIELD_TYPES.timestamp },
      { path: 'list', type: ALL_FIELD_TYPES.latlng },
      { path: 'list', type: ALL_FIELD_TYPES.path },
      { path: 'list', type: ALL_FIELD_TYPES.map },
      // { path: 'array', value: defaultValues.string },
      { path: 'list[]', type: ALL_FIELD_TYPES.number },
      { path: 'list[]', type: ALL_FIELD_TYPES.int },
      { path: 'list[]', type: ALL_FIELD_TYPES.float },
      { path: 'list[]', type: ALL_FIELD_TYPES.boolean },
      { path: 'list[]', type: ALL_FIELD_TYPES.null },
      { path: 'list[]', type: ALL_FIELD_TYPES.timestamp },
      { path: 'list[]', type: ALL_FIELD_TYPES.latlng },
      { path: 'list[]', type: ALL_FIELD_TYPES.path },
      { path: 'list[]', type: ALL_FIELD_TYPES.map },
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
      { path: 'map', type: ALL_FIELD_TYPES.int },
      { path: 'map', type: ALL_FIELD_TYPES.float },
      { path: 'map', type: ALL_FIELD_TYPES.boolean },
      { path: 'map', type: ALL_FIELD_TYPES.null },
      { path: 'map', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map', type: ALL_FIELD_TYPES.latlng },
      { path: 'map', type: ALL_FIELD_TYPES.path },
      { path: 'map', type: ALL_FIELD_TYPES.list },

      { path: 'map.string', type: ALL_FIELD_TYPES.number },
      { path: 'map.string', type: ALL_FIELD_TYPES.int },
      { path: 'map.string', type: ALL_FIELD_TYPES.float },
      { path: 'map.string', type: ALL_FIELD_TYPES.boolean },
      { path: 'map.string', type: ALL_FIELD_TYPES.null },
      { path: 'map.string', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map.string', type: ALL_FIELD_TYPES.latlng },
      { path: 'map.string', type: ALL_FIELD_TYPES.path },
      { path: 'map.string', type: ALL_FIELD_TYPES.map },
      { path: 'map.string', type: ALL_FIELD_TYPES.list },
    ]
    expect(JSON.stringify(getAllPathTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })

  it(`check map.array`, async () => {
    const DOCUMENT_TYPE: DocumentType = {
      map: [
        {
          'list[]': [PRIMITIVE_FIELD_TYPES.string],
        },
      ],
    }
    const LIST: PathType[] = [
      { path: 'map', type: ALL_FIELD_TYPES.string },
      { path: 'map', type: ALL_FIELD_TYPES.number },
      { path: 'map', type: ALL_FIELD_TYPES.int },
      { path: 'map', type: ALL_FIELD_TYPES.float },
      { path: 'map', type: ALL_FIELD_TYPES.boolean },
      { path: 'map', type: ALL_FIELD_TYPES.null },
      { path: 'map', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map', type: ALL_FIELD_TYPES.latlng },
      { path: 'map', type: ALL_FIELD_TYPES.path },
      { path: 'map', type: ALL_FIELD_TYPES.list },

      { path: 'map.list', type: ALL_FIELD_TYPES.string },
      { path: 'map.list', type: ALL_FIELD_TYPES.number },
      { path: 'map.list', type: ALL_FIELD_TYPES.int },
      { path: 'map.list', type: ALL_FIELD_TYPES.float },
      { path: 'map.list', type: ALL_FIELD_TYPES.boolean },
      { path: 'map.list', type: ALL_FIELD_TYPES.null },
      { path: 'map.list', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map.list', type: ALL_FIELD_TYPES.latlng },
      { path: 'map.list', type: ALL_FIELD_TYPES.path },
      { path: 'map.list', type: ALL_FIELD_TYPES.map },

      { path: 'map.list[]', type: ALL_FIELD_TYPES.number },
      { path: 'map.list[]', type: ALL_FIELD_TYPES.int },
      { path: 'map.list[]', type: ALL_FIELD_TYPES.float },
      { path: 'map.list[]', type: ALL_FIELD_TYPES.boolean },
      { path: 'map.list[]', type: ALL_FIELD_TYPES.null },
      { path: 'map.list[]', type: ALL_FIELD_TYPES.timestamp },
      { path: 'map.list[]', type: ALL_FIELD_TYPES.latlng },
      { path: 'map.list[]', type: ALL_FIELD_TYPES.path },
      { path: 'map.list[]', type: ALL_FIELD_TYPES.map },
    ]
    expect(JSON.stringify(getAllPathTypes(DOCUMENT_TYPE))).toBe(JSON.stringify(LIST))
  })
})
