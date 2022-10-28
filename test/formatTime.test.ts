import { describe, expect, it } from 'vitest'
import { formatAxis, formatPast } from '../src/formatTime'

describe('格式化时间', () => {
  it('问候语', () => {
    expect(formatAxis(new Date(2022, 10, 26, 5))).toBe('凌晨好')
    expect(formatAxis(new Date(2022, 10, 26, 12))).toBe('中午好')
    expect(formatAxis(new Date(2022, 10, 26, 23))).toBe('夜里好')
  })

  it('过去时间', () => {
    /**
     * 时间验证情况比较复杂,可看懂传参如何即可!
     */
    // expect(formatPast('2022-10-27 22:30:00')).toBe('一分钟前')
    expect(formatPast('2022-01-27 22:30:00', 'yyyy-MM-dd HH:mm:ss')).toBe('')
  })
})
