import { formatDate } from './format';

/**
 * 百分比格式化
 * @param row 行数据
 * @param column 列数据
 * @param cellValue 单元格数据
 * @returns 格式化后的百分比字符串
 */
export const percentFormat = (row: any, column: number, cellValue: any) => {
	return cellValue ? `${cellValue}%` : '-';
};

/**
 * 
 * 列表日期格式化
 * @param row 行数据
 * @param column 列数据
 * @param cellValue 单元格数据
 * @returns 格式化后的日期字符串
 */
// 优化后的日期格式化函数
export const dateFormatYMD = (row: any, column: number, cellValue: any) => {
	if (!cellValue) return '-';
	try {
		return formatDate(new Date(cellValue), 'YYYY-mm-dd');
	} catch (e) {
		console.error('日期格式化错误:', e);
		return '-';
	}
};

// 优化后的 scaleFormat 函数
export const scaleFormat = (value: any = 0, scale: number = 4) => {
	const num = Number(value);
	if (isNaN(num)) return '0';
	return num.toFixed(scale);
};

/**
 * 列表日期时间格式化
 * @param row 行数据
 * @param column 列数据
 * @param cellValue 单元格数据
 * @returns 格式化后的日期时间字符串
 */
export const dateFormatYMDHMS = (row: any, column: number, cellValue: any) => {
	if (!cellValue) return '-';
	return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
};


/**
 * 列表时间格式化
 * @param row 行数据
 * @param column 列数据
 * @param cellValue 单元格数据
 * @returns 格式化后的时间字符串
 */
export const dateFormatHMS = (row: any, column: number, cellValue: any) => {
	if (!cellValue) return '-';
	let time = 0;
	if (typeof row === 'number') time = row;
	if (typeof cellValue === 'number') time = cellValue;
	return formatDate(new Date(time * 1000), 'HH:MM:SS');
};
