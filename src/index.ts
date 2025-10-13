// 导入lodash-es的所有功能
export * from 'lodash-es'

// 导入dayjs并重新导出
import dayjs from 'dayjs'
export { dayjs as Dayjs }

// 导入is模块的功能
export {
  is,
  isFunction,
  isDef,
  isUnDef,
  isObject,
  isDate,
  isNumber,
  isString,
  isBoolean,
  isSymbol,
  isBigInt,
  isArray,
  isMap,
  isSet,
  isRegExp,
  isPromise,
  isNullOrUnDef,
  isNullObj,
  isWeekday,
  isClient,
  isWindow,
  isElement,
  isImageDom,
  isMobile
} from './is'
