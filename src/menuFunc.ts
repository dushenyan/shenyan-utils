import { uniq } from 'lodash-es'

export function getChildrenLabelMenu(data: any, type: string) {
  let arr: Array<number> = []

  data.map((item: any) => {
    Object.keys(item).map((i) => {
      if (i === type) {
        item[i]?.map((chilrenItem: { [x: string]: { label?: any }[]; label?: any }) => {
          Object.keys(chilrenItem).map((ci) => {
            if (ci === type) {
              arr.push(item.label)
              chilrenItem[ci]?.map((sonItem) => {
                Object.keys(sonItem).map((si) => {
                  if (si === type) {
                    arr.push(chilrenItem.label)
                  }
                })
              })
            }
          })
        })
      }
    })
  })
  return uniq(arr)
}

/**
 * 查看嵌套数组对象下边所有的label值
 * @param data 树数组
 * @param type 键
 * @returns 新数组
 */
export function getAllLabelMenu(data: any, type: string) {
  let arr: Array<number> = []

  data.map((item: { [x: string]: { [x: string]: { label?: any }[]; label?: any }[]; label?: any }) => {
    Object.keys(item).map((i) => {
      arr.push(item.label)
      if (i === type) {
        item[i]?.map((chilrenItem: { [x: string]: { label?: any }[]; label?: any }) => {
          Object.keys(chilrenItem).map((ci) => {
            arr.push(chilrenItem.label)
            if (ci === type) {
              chilrenItem[ci]?.map((sonItem) => {
                Object.keys(sonItem).map((si) => {
                  arr.push(sonItem.label)
                })
              })
            }
          })
        })
      }
    })
  })
  return uniq(arr)
}
