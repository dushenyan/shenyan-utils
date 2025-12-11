import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import doctrine from 'doctrine'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取项目根目录
const projectRoot = path.resolve(__dirname, '..')

/**
 * 解析 TypeScript 文件中的 JSDoc 注释（仅处理导出的函数）
 * @param filePath 文件路径
 * @returns 包含方法名和注释的对象数组
 */
function parseJSDocComments(filePath: string): Array<{ name: string, description: string, params: Array<{ name: string, description: string }>, returns: string | null }> {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')

    // 存储解析结果
    const results: Array<{ name: string, description: string, params: Array<{ name: string, description: string }>, returns: string | null }> = []

    // 先找到所有导出函数的位置
    const exportPositions: Array<{ start: number, end: number, name: string }> = []
    const exportFunctionRegex = /export\s+(?:const|function)\s+(\w+)/g
    let exportMatch

    while ((exportMatch = exportFunctionRegex.exec(content)) !== null) {
      exportPositions.push({
        start: exportMatch.index,
        end: exportMatch.index + exportMatch[0].length,
        name: exportMatch[1],
      })
    }

    // 为每个导出函数找到对应的 JSDoc 注释
    for (const exportPos of exportPositions) {
      // 向前查找最近的 JSDoc 注释
      const commentStartPos = content.lastIndexOf('/**', exportPos.start)
      if (commentStartPos === -1)
        continue

      const commentEndPos = content.indexOf('*/', commentStartPos)
      if (commentEndPos === -1 || commentEndPos > exportPos.start)
        continue

      const commentBlock = content.substring(commentStartPos, commentEndPos + 2)

      try {
        // 使用 doctrine 解析 JSDoc 注释
        const parsed = doctrine.parse(commentBlock, { unwrap: true, sloppy: true })

        const params = parsed.tags
          .filter(tag => tag.title === 'param')
          .map(tag => ({
            name: tag.name || '',
            description: tag.description || '',
          }))

        const returnsTag = parsed.tags.find(tag => tag.title === 'returns')
        const returns = returnsTag ? returnsTag.description : null

        results.push({
          name: exportPos.name,
          description: parsed.description || '',
          params,
          returns,
        })
      }
      catch (parseError) {
        console.error(`解析方法 ${exportPos.name} 时出错:`, parseError)
      }
    }

    return results
  }
  catch (error) {
    console.error(`错误解析文件 ${filePath}:`, error)
    return []
  }
}

interface SourceMeteVO {
  name: string
  description: string
  params: Array<{
    name: string
    description: string
  }>
  returns: string | null
}

/**
 * 获取文件中所有导出的方法及其注释
 */
export async function getExportedMethods(): Promise<SourceMeteVO[] | undefined> {
  try {
    // 处理从 ./format 导出的方法
    const formatPath = path.join(projectRoot, 'src/format.ts')
    const formatMethods = parseJSDocComments(formatPath)

    return formatMethods
    // console.log('formatMethods', formatMethods)
    // if (formatMethods.length > 0) {
    //   formatMethods.forEach((method, index) => {
    //     console.log(`   ${index + 1}. 方法名称: ${method.name}`)
    //     console.log(`      描述: ${method.description}`)
    //     if (method.params.length > 0) {
    //       console.log('      参数:')
    //       method.params.forEach(param => {
    //         console.log(`        - ${param.name}: ${param.description}`)
    //       })
    //     }
    //     if (method.returns) {
    //       console.log(`      返回值: ${method.returns}`)
    //     }
    //     console.log('')
    //   })
    // } else {
    //   console.log('   未找到导出的方法\n')
    // }
  }
  catch (error) {
    console.error(' 获取导出方法时出错:', error)
  }
}

// 执行函数
// getExportedMethods()
