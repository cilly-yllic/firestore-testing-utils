import { KeyTypeConst, Type } from './key-type.js'
export type Inclusions<T extends KeyTypeConst> = {
  [type in Type<T>]: Type<T>[]
}
