import { describe, expect, it } from 'vitest'
import { takeKeyByArray } from '../src/arrayOperation' // 请根据实际路径调整

describe('arrayOperation > takeKeyByArray', () => {
  it('应该从对象数组中提取指定键的值', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]
    expect(takeKeyByArray(input, 'name')).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('当键不存在时应返回空数组', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]
    expect(takeKeyByArray(input, 'age')).toEqual([])
  })

  it('处理空数组时应返回空数组', () => {
    expect(takeKeyByArray([], 'name')).toEqual([])
  })

  it('应该处理混合存在/不存在的键', () => {
    const input = [
      { id: 1, name: 'Alice' },
      { id: 2 },
      { id: 3, name: 'Charlie' },
    ]
    expect(takeKeyByArray(input, 'name')).toEqual(['Alice', 'Charlie'])
  })

  it('应该处理嵌套对象但不深入查找', () => {
    const input = [
      { id: 1, info: { name: 'Alice' } },
      { id: 2, name: 'Bob' },
    ]
    expect(takeKeyByArray(input, 'name')).toEqual(['Bob'])
    expect(takeKeyByArray(input, 'info')).toEqual([{ name: 'Alice' }])
  })

  it('应该处理非对象数组元素', () => {
    expect(takeKeyByArray([null, undefined, 123, 'string'], 'name')).toEqual([])
  })
})
