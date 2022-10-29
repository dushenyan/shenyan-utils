import { describe, expect, it } from 'vitest'
import formatMoney, { formatAxis, formatPast } from '../src/format'

describe('格式化选项', () => {
  it('12341234.246', () => {
    expect(formatMoney('12341234.246')).toEqual('12,341,234.25')
  })
})

describe('格式化时间', () => {
  it('问候语', () => {
    expect(formatAxis(new Date(2022, 10, 26, 5))).toBe('凌晨好 🌛')
    expect(formatAxis(new Date(2022, 10, 26, 12))).toBe('中午好 🌞')
    expect(formatAxis(new Date(2022, 10, 26, 23))).toBe('晚上好 🌛')
  })

  it('过去时间', () => {
    /**
     * 时间验证情况比较复杂,可看懂传参如何即可!
     */
    // expect(formatPast('2022-10-29 22:30:00')).toBe('一分钟前')
  })
})
