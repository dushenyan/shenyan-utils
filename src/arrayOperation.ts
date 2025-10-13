/**
 * 判断两数组字符串是否相同（用于按钮权限验证），数组字符串中存在相同时会自动去重（按钮权限标识不会重复）
 * @param news 新数据
 * @param old 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
// 优化后的 judementSameArr 函数
export function judgmentSameArr(newArr: unknown[] | string[], oldArr: string[]): boolean {
	const news = removeDuplicate(newArr);
	const olds = removeDuplicate(oldArr);
	
	// 使用 every 方法简化逻辑
	return news.length <= olds.length && news.every(item => olds.includes(item as string));
}

// 优化后的 removeDuplicate 函数
export function removeDuplicate(arr: any[], attr?: string) {
	if (!arr || !arr.length) {
		return arr;
	}
	
	if (attr) {
		// 使用 Map 来优化去重逻辑
		const seen = new Map();
		return arr.filter(item => {
			const key = item[attr];
			if (seen.has(key)) {
				return false;
			}
			seen.set(key, true);
			return true;
		});
	} else {
		// 简化数组去重
		return [...new Set(arr)];
	}
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
	if (!a || !b) return false;
	let aProps = Object.getOwnPropertyNames(a);
	let bProps = Object.getOwnPropertyNames(b);
	if (aProps.length != bProps.length) return false;
	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];
		let propA = a[propName];
		let propB = b[propName];
		if (!b.hasOwnProperty(propName)) return false;
		if (propA instanceof Object) {
			if (!isObjectValueEqual(propA, propB)) return false;
		} else if (propA !== propB) {
			return false;
		}
	}
	return true;
}

/**
 * 将数组对象以匹配参数键形式返回一个数组
 * @param oldArr 原数组
 * @param key 匹配键
 * @returns 新数组
 */
export function takeKeyByArray(oldArr: Array<any>, key: string) {
	let newArr: Array<string> = []
	oldArr.map((i: any) => {
		Object.keys(i).map(ii => {
			if (ii === key) {
				newArr.push(i[ii])
			}
		})
	})
	return newArr
}
