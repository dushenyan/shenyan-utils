<script setup lang="ts">
import Prism from 'prismjs'
import { computed } from 'vue'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'

interface ApiMethod {
  name: string
  description: string
  params: Array<{
    name: string
    description: string
  }>
  returns: string | null
}

interface Props {
  method: ApiMethod
}

const props = defineProps<Props>()

function getExampleUsage() {
  const methodName = props.method.name
  switch (methodName) {
    case 'formatMoney':
      return `const result = formatMoney('1234.56', 2, '$')
console.log(result)`
    case 'formatDate':
      return `const date = new Date()
const result = formatDate(date, 'YYYY-mm-dd HH:MM:SS')
console.log(result)`
    case 'getWeek':
      return `const date = new Date()
const weekNumber = getWeek(date)
console.log(weekNumber)`
    case 'formatPast':
      return `const pastDate = new Date(Date.now() - 3600000)
const result = formatPast(pastDate)
console.log(result)`
    case 'formatAxis':
      return `const date = new Date()
const greeting = formatAxis(date)
console.log(greeting)`
    default:
      return `// 使用 ${methodName} 函数
const result = ${methodName}()`
  }
}

function getMethodOutput() {
  const methodName = props.method.name
  switch (methodName) {
    case 'formatMoney':
      return '$1,234.56'
    case 'formatDate':
      return '2023-04-15 14:30:22'
    case 'getWeek':
      return '15'
    case 'formatPast':
      return '1小时前'
    case 'formatAxis':
      return '下午好 🌞'
    default:
      return ''
  }
}

const highlightedCode = computed(() => {
  return Prism.highlight(
    `import { ${props.method.name} } from 'shenyan-utils'\n\n${getExampleUsage()}`,
    Prism.languages.javascript,
    'javascript',
  )
})

const highlightedOutput = computed(() => {
  const output = getMethodOutput()
  if (!output)
    return ''

  return Prism.highlight(
    output,
    Prism.languages.text,
    'text',
  )
})
</script>

<template>
  <div class="api-method">
    <div class="method-header">
      <h3 :id="method.name" class="method-name">
        {{ method.name }}
      </h3>
      <span class="method-tag">Function</span>
    </div>

    <p class="method-description">
      {{ method.description }}
    </p>

    <div v-if="method.params && method.params.length > 0" class="method-params">
      <h4>参数</h4>
      <div class="params-table">
        <div
          v-for="(param) in method.params"
          :key="param.name"
          class="param-row"
        >
          <div class="param-info">
            <span class="param-name">{{ param.name }}</span>
            <span class="param-type">string</span>
          </div>
          <div class="param-desc">
            {{ param.description }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="method.returns" class="method-returns">
      <h4>返回值</h4>
      <div class="returns-content">
        <span class="returns-type">string</span>
        <p>{{ method.returns }}</p>
      </div>
    </div>

    <div class="method-example">
      <h4>示例</h4>
      <div class="example-content">
        <div class="example-code">
          <pre><code class="language-js" v-html="highlightedCode" /></pre>
        </div>
        <div v-if="getMethodOutput()" class="example-output">
          <h5>输出</h5>
          <pre><code class="language-text" v-html="highlightedOutput" /></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.api-method {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.api-method:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.method-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.method-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
}

.method-tag {
  background-color: #007acc;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.method-description {
  font-size: 1rem;
  color: #495057;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.method-params h4,
.method-returns h4,
.method-example h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #212529;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.params-table {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.param-row {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem;
  background-color: #ffffff;
}

.param-row:last-child {
  border-bottom: none;
}

.param-info {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.param-name {
  font-weight: 700;
  color: #007acc;
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  margin-right: 0.5rem;
}

.param-type {
  background-color: #e7f3ff;
  color: #007acc;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.param-desc {
  color: #495057;
  line-height: 1.5;
}

.method-returns .returns-content {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 1rem;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.returns-type {
  background-color: #e7f3ff;
  color: #007acc;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.method-returns p {
  margin: 0;
  color: #495057;
  line-height: 1.5;
}

.example-content {
  background-color: #ffffff;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.example-code {
  padding: 0;
}

.example-code pre {
  margin: 0;
  padding: 1rem;
  border-radius: 0;
  overflow-x: auto;
}

.example-code :deep(code) {
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  font-size: 0.9rem;
}

.example-output {
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.example-output h5 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #495057;
  font-weight: 600;
}

.example-output pre {
  margin: 0;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  overflow-x: auto;
}

.example-output :deep(code) {
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
}

@media (max-width: 768px) {
  .api-method {
    padding: 1rem;
  }

  .method-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .method-tag {
    margin-top: 0.5rem;
  }
}
</style>
