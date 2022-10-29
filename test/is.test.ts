import { describe, expect, it } from 'vitest'
import { is, isDate, isFunction, isObject } from '../src/index'

describe('类型判断', () => {
  it('对象判断', () => {
    expect(isObject({ name: 'dushenya' })).toBe(true)
    expect(isObject('dushenyan')).toBe(false)
  })

  it('判断值是否未某个类型', () => {
    expect(is(1, 'Number')).toBe(true)
    expect(is('dushenyan', 'String')).toBe(true)
    expect(is(true, 'Boolean')).toBe(true)
    expect(is(['dushenyan'], 'Array')).toBe(true)
    expect(is({ name: 'dushenyan' }, 'Object')).toBe(true)
  })

  it('是否为函数', () => {
    expect(isFunction(new Function())).toBe(true)
  })

  it('是否为时间', () => {
    expect(isDate(new Date())).toBe(true)
  })
})
