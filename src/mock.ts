import { zh_CN, Faker } from '@faker-js/faker';

/**
 * 模拟数据类
 * link: https://www.npmjs.com/package/@faker-js/faker
 */
class MockData {
  faker: Faker;
  constructor() {
    this.faker = new Faker({
      locale: [zh_CN],
    });
  }
  
}

export default  MockData
