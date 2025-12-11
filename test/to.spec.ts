import { describe, expect, it } from 'vitest'
import { toChineseNumber } from '../src/to'

describe('toChineseNumber', () => {
  it('应该正确转换个位数', () => {
    expect(toChineseNumber(5)).toBe('五')
    expect(toChineseNumber(9)).toBe('九')
  })

  it('应该正确转换十位数', () => {
    expect(toChineseNumber(10)).toBe('十')
    expect(toChineseNumber(15)).toBe('十五')
    expect(toChineseNumber(99)).toBe('九十九')
  })

  it('应该正确转换百位数', () => {
    expect(toChineseNumber(100)).toBe('一百')
    expect(toChineseNumber(101)).toBe('一百零一')
    expect(toChineseNumber(110)).toBe('一百一十')
    expect(toChineseNumber(999)).toBe('九百九十九')
  })

  it('应该正确转换千位数', () => {
    expect(toChineseNumber(1000)).toBe('一千')
    expect(toChineseNumber(1001)).toBe('一千零一')
    expect(toChineseNumber(1010)).toBe('一千零一十')
    expect(toChineseNumber(1100)).toBe('一千一百')
    expect(toChineseNumber(9999)).toBe('九千九百九十九')
  })

  it('应该正确转换万位数', () => {
    expect(toChineseNumber(10000)).toBe('一万')
    expect(toChineseNumber(10001)).toBe('一万零一')
    expect(toChineseNumber(10010)).toBe('一万零一十')
    expect(toChineseNumber(10100)).toBe('一万零一百')
    expect(toChineseNumber(11000)).toBe('一万一千')
    expect(toChineseNumber(99999)).toBe('九万九千九百九十九')
  })

  it('应该正确处理零的情况', () => {
    expect(toChineseNumber(101)).toBe('一百零一')
    expect(toChineseNumber(1001)).toBe('一千零一')
    expect(toChineseNumber(1010)).toBe('一千零一十')
    expect(toChineseNumber(10001)).toBe('一万零一')
  })

  it('应该抛出错误当输入非自然数', () => {
    // 自然数不包含0
    expect(() => toChineseNumber(0)).toThrowError('请输入自然数')

    // 修改测试断言，更明确地检查错误消息
    expect(() => toChineseNumber(-1)).toThrowError('请输入自然数')
    expect(() => toChineseNumber(1.5)).toThrowError('请输入自然数')

    // 添加更多边界情况测试
    expect(() => toChineseNumber(Number.NaN)).toThrowError('请输入自然数')
    expect(() => toChineseNumber(Infinity)).toThrowError('请输入自然数')
  })
})
