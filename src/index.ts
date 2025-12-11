// 导入lodash-es的所有功能
// 导入dayjs并重新导出
import dayjs from 'dayjs'

// 导入is模块的功能
export {
  is,
  isArray,
  isBigInt,
  isBoolean,
  isClient,
  isDate,
  isDef,
  isElement,
  isFunction,
  isImageDom,
  isMap,
  isMobile,
  isNullObj,
  isNullOrUnDef,
  isNumber,
  isObject,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUnDef,
  isWeekday,
  isWindow,
} from './is'
export { dayjs as Dayjs }

export * from 'lodash-es'
