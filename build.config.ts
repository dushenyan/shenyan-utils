import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,  // 内联依赖以避免绝对路径引用
  },
  // 确保不生成stub文件
  stub: false,
  // 使用更现代的构建选项
  replace: {
    'process.env.NODE_ENV': JSON.stringify('production')
  }
})
