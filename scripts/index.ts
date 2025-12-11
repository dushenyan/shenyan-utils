import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getExportedMethods } from './getExportedMethods'

export const cacheFilePath = '/docs/.vitepress/.api-tree.json'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * 生成 API 树并写入文件
 * @param outputFile 输出文件路径（相对路径）
 */
export async function writeTreeToFile(outputFile: string) {
  // 确保输出目录存在
  const fullPath = path.join(__dirname, '..', outputFile)
  const dir = path.dirname(fullPath)

  // 如果目录不存在则创建
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(fullPath, JSON.stringify(await getExportedMethods(), null, 2), 'utf-8')
  console.log(`${fullPath} 已生成`)
}

// 使用相对路径而不是绝对路径
writeTreeToFile(cacheFilePath)
