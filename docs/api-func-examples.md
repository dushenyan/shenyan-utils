---
outline: deep
---

# Runtime Func API Examples

This page demonstrates usage of the shenyan-utils library functions.

<script setup>
import { useApiTree } from '/.vitepress/useApiTree'
import ApiMethod from './.vitepress/components/ApiMethod.vue'

const { apiMethods, loading, error } = useApiTree()
</script>

<ApiMethod
    v-for="method in apiMethods"
    :key="method.name"
    :method="method"
  />
