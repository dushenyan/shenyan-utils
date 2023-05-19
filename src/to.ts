/**
 * CK https://blog.csdn.net/qq_45438854/article/details/121534457
 * 将数字转换为中文简拼意思
 * @param n Number 自然数
 * @returns 
 */
export const toChineseNumber = (n:number) => {
  if (!Number.isInteger(n) && n < 0) {
    throw Error('请输入自然数');
  }
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const positions = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿'];
  const charArray = String(n).split('');
  let result = '';
  let prevIsZero = false;

  for (let i = 0; i < charArray.length; i++) {
    const ch = charArray[i];
    if (ch !== '0' && !prevIsZero) {
      result += digits[parseInt(ch)] + positions[charArray.length - i - 1];
    } else if (ch === '0') {
      prevIsZero = true;
    } else if (ch !== '0' && prevIsZero) {
      result += '零' + digits[parseInt(ch)] + positions[charArray.length - i - 1];
    }
  }

  if (n < 100) {
    result = result.replace('一十', '十');
  }
  return result;
}

