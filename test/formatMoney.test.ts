import { describe, expect, it } from 'vitest'
import formatMoney from '../src/formatMoney'

describe('格式化选项', () => {
  it('12341234.246', () => {
    expect(formatMoney('12341234.246')).toEqual('12,341,234.25')
  })
})
