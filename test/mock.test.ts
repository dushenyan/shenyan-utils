import { Faker, zh_CN } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import MockData from '../src/mock'

vi.mock('@faker-js/faker', () => ({
  zh_CN: {},
  Faker: vi.fn().mockImplementation(() => { // 修改这里，使用命名函数
    return {
      person: {
        firstName: vi.fn().mockReturnValue('测试名'),
        lastName: vi.fn().mockReturnValue('测试姓'),
      },
      address: {
        city: vi.fn().mockReturnValue('测试城市'),
      },
    }
  }),
}))

describe('mockData', () => {
  let mockData: MockData

  beforeEach(() => {
    mockData = new MockData()
  })

  it('应该正确初始化faker实例', () => {
    expect(mockData.faker).toBeDefined()
    expect(Faker).toHaveBeenCalledWith({
      locale: [zh_CN],
    })
  })

  it('faker实例应包含中文本地化方法', () => {
    expect(mockData.faker.person.firstName()).toBe('测试名')
    expect(mockData.faker.person.lastName()).toBe('测试姓')
    expect(mockData.faker.address.city()).toBe('测试城市')
  })

  it('应该导出单例实例', async () => {
    const importedInstance = (await import('../src/mock')).default
    console.log('importedInstance', importedInstance)
    expect(new importedInstance()).toBeInstanceOf(MockData)
  })
})
