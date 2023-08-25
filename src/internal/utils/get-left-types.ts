import { Inclusions } from '../types/inclusion-types.js'
import { KeyTypeConst, KeyType, Type } from '../types/key-type.js'

export const getLeftTypes = <C extends KeyTypeConst = KeyTypeConst>(
  types: Type<C>[],
  keyTypes: KeyType<C>,
  inclusions: Inclusions<C>
): Type<C>[] =>
  Object.values(keyTypes).filter(keyType => {
    if (keyType in inclusions && inclusions[keyType].length > 0) {
      return types.every(type => !inclusions[keyType].includes(type))
    }
    return types.every(type => keyType !== type)
  })
