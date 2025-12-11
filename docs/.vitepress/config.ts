import { defineConfig } from 'vitepress'
import apiTreePlugin from './plugins/apiTreePlugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'shenyan-utils',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API Examples', link: '/api-func-examples' },
    ],

    sidebar: [
      {
        text: 'API Documentation',
        items: [
          { text: 'Function API', link: '/api-func-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dbudaiya/shenyan-utils' },
    ],
  },
  vite: {
    plugins: [
      apiTreePlugin({}),
    ],
    resolve: {
      alias: {
        '@': '/docs',
      },
    },
  },
})
