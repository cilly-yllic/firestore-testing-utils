/* eslint-disable @typescript-eslint/no-explicit-any */
export const getValueType = (value: any): string => Object.prototype.toString.call(value).slice(8, -1)

export const isNumber = (value: any): boolean => getValueType(value) === 'Number' && !Number.isNaN(value)
export const isBoolean = (value: any): boolean => getValueType(value) === 'Boolean'
export const isString = (value: any): boolean => getValueType(value) === 'String'
export const isArray = (value: any): boolean => Array.isArray(value)
export const isObject = (value: any): boolean => getValueType(value) === 'Object'
export const isDate = (value: any): boolean => getValueType(value) === 'Date'
export const isNumberAllowString = (value: any) => {
  if (isNumber(value)) {
    return value - value === 0
  }
  if (isString(value) && value.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+value) : isFinite(+value)
  }
  return false
}
/* eslint-enable @typescript-eslint/no-explicit-any */
