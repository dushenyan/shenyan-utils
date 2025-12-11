import { nextTick } from 'vue'
import { isString } from './is'

/**
 * 设置 自定义 tagsView 名称
 * @param params 路由 query、params 中的 tagsViewName
 * @returns 返回当前 tagsViewName 名称
 */
export function setTagsViewNameI18n(item: any) {
  let tagsViewName: any = ''
  const { query, params, meta } = item
  if (query?.tagsViewName || params?.tagsViewName) {
    // 非国际化
    tagsViewName = query?.tagsViewName || params?.tagsViewName
  }
  else {
    // 非自定义 tagsView 名称
    tagsViewName = meta.title
  }
  return tagsViewName
}

/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
export function lazyImg(el: any, arr: any) {
  const io = new IntersectionObserver((res) => {
    res.forEach((v: any) => {
      if (v.isIntersecting) {
        const { img, key } = v.target.dataset
        v.target.src = img
        v.target.onload = () => {
          io.unobserve(v.target)
          arr[key].loading = false
        }
      }
    })
  })
  nextTick(() => {
    document.querySelectorAll(el).forEach(img => io.observe(img))
  })
}

/**
 * 复制对象属性
 * @param src 源对象
 * @param dest 目标对象
 */
export function copyProperties(src: any, dest: any) {
  for (const k in src) {
    dest[k] = src[k]
  }
}

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: any) {
  let newObj: any
  try {
    newObj = obj.push ? [] : {}
  }
  catch (error) {
    newObj = {}
  }
  for (const attr in obj) {
    if (obj[attr] && typeof obj[attr] === 'object') {
      newObj[attr] = deepClone(obj[attr])
    }
    else {
      newObj[attr] = obj[attr]
    }
  }
  return newObj
}

/**
 * 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @description @感谢大黄
 * @param list 数组对象
 * @returns 删除空值后的数组对象
 */
export function handleEmpty(list: any) {
  const arr = []
  for (const i in list) {
    const d = []
    for (const j in list[i]) {
      d.push(list[i][j])
    }
    const leng = d.filter(item => item === '').length
    if (leng !== d.length) {
      arr.push(list[i])
    }
  }
  return arr
}

/**
 * 一个利用 a 标签下载文件的函数
 * @param {string | Blob | File} fileURL - 文件的 URL、Blob 对象或 File 对象
 * @param {string} [fileName] - 下载时的文件名（可选）。如果未提供，则使用当前时间戳作为文件名
 * @throws {Error} - 如果在非浏览器环境中调用该函数，将抛出错误
 */
export function linkDownload(fileURL: string | Blob | File, fileName?: string): void {
  const href: string = isString(fileURL) ? fileURL : URL.createObjectURL(fileURL)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = href
  a.download = fileName || Date.now().toString()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  if (!isString(fileURL))
    URL.revokeObjectURL(href)
}

/**
 * 图片转为 Base64 字符串
 * @param {string} imgURL 待转换的图片路径
 * @param {string} type 转换后的图片类型
 * @param  {number} quality 转换后的图片质量
 * @returns {string} Base64 字符串
 */
export function imageToBase64(imgURL: string, quality = 0.9): Promise<string> {
  const img = new Image()
  // 因为是网络资源所以会有图片跨域问题产生，此属性可以解决跨域问题
  img.setAttribute('crossOrigin', 'anonymous')
  // 如果需要兼容 iOS，这两个顺序一定不能换，先设置 crossOrigin 后设置 src
  img.src = imgURL
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const cvs = document.createElement('canvas')
      cvs.width = img.width
      cvs.height = img.height
      const ctx = cvs.getContext('2d')!
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
      resolve(cvs.toDataURL('image/png', quality))
    }
    img.onerror = (error: any) => reject(error)
  })
}

/**
 * 获取当前设备的屏幕 DPI（每英寸像素数）
 *  此函数通过创建一个宽度为 1 英寸的临时不可见 div 元素，
 *  将其添加到文档中后读取其 offsetWidth 属性来计算当前设备的 DPI，然后移除该元素。
 * @returns {number} 当前设备的 DPI（即 1 英寸所对应的像素数）
 */
export function getDeviceDpi(): number {
  const tempDiv = document.createElement('div')
  tempDiv.style.width = '1in'
  tempDiv.style.visibility = 'hidden'
  document.body.appendChild(tempDiv)
  const dpi = tempDiv.offsetWidth
  document.body.removeChild(tempDiv)
  return dpi
}
