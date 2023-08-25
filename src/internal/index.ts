import { TypePattern } from './types/firestore-field-types.js'
import { Inclusions } from './types/inclusion-types.js'
import { KeyTypePatterns } from './types/key-type-patterns.js'
import { KeyType, KeyTypeConst } from './types/key-type.js'
import { Data } from './types/utilities.js'
import { getAllTheOtherFieldTypes } from './utils/get-all-the-other-field-types.js'
import { getKeyTypePatterns } from './utils/get-key-type-patterns.js'
import { updateObjProp, copy, hasKey } from './utils/utilities.js'

export { getKeyTypePatterns } from './utils/get-key-type-patterns.js'
export { convertTypeToValue } from './utils/convert-type-to-value.js'

export const getRecursiveWrongTypes = <D extends Data = Data, C extends KeyTypeConst = KeyTypeConst>(
  keyTypes: KeyTypePatterns<D>,
  keyType: KeyType<C>,
  inclusions: Inclusions<C>
) => {
  const patterns = getKeyTypePatterns(keyTypes) as TypePattern[]
  const types = getAllTheOtherFieldTypes<D, C>(keyTypes, keyType, inclusions)
  const list: TypePattern[] = []
  for (const pattern of patterns) {
    for (const { path, type } of types) {
      if (!hasKey(pattern, path.replace(/\[\]$/, ''))) {
        continue
      }
      const _pattern = copy(pattern)
      updateObjProp(_pattern, type as string, path)
      list.push(_pattern)
    }
  }
  return list.filter(
    (pattern, index) => list.findIndex(_pattern => JSON.stringify(_pattern) === JSON.stringify(pattern)) === index
  )
}
