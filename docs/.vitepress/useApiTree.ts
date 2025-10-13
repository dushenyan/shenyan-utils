import { ref, onMounted } from 'vue'
import apiTreeData from './.api-tree.json'

interface ApiMethod {
  name: string
  description: string
  params: Array<{
    name: string
    description: string
  }>
  returns: string | null
}

export function useApiTree() {
  const apiMethods = ref<ApiMethod[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(() => {
    try {
      // 从JSON文件加载API数据
      apiMethods.value = apiTreeData as ApiMethod[]
      loading.value = false
    } catch (err) {
      error.value = 'Failed to load API data'
      loading.value = false
      console.error('Error loading API tree:', err)
    }
  })

  return {
    apiMethods,
    loading,
    error
  }
}
