import moment from 'moment'

/**
 *
 * @param ts 毫秒级时间戳
 * @returns  时间字符串
 */
export function timestamp_to_date_str(ts: number, format: string = 'yyyy-MM-dd HH:mm:ss'): string {
  return date_to_str(timestamp_to_date(ts), format)
}

/**
 * 时间戳转时间
 *
 * @param ts 毫秒级秒级时间戳
 * @returns Date
 */
export function timestamp_to_date(ts: number): Date {
  return new Date(ts)
}

/**
 * 日期转时间字符串
 *
 * @param date
 * @param format
 * @returns
 */
export function date_to_str(date: Date, format: string): string {
  if (date) {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds(), // 毫秒
    }
    const week = {
      0: '\u65E5',
      1: '\u4E00',
      2: '\u4E8C',
      3: '\u4E09',
      4: '\u56DB',
      5: '\u4E94',
      6: '\u516D',
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(format)) {
      format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661F\u671F' : '\u5468') : '') + week[`${date.getDay()}`])
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
      }
    }
    return format
  }
  return ''
}

export function timestamp_to_moment(ts: number): moment.Moment {
  return moment(ts)
}

export function timestamp_to_moment_str(ts: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return moment(ts).format(format)
}
