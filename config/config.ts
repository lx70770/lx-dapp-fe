import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    ENV: process.env.UMI_ENV,
  },
  favicons: ['/favicon.ico'],
  npmClient: 'npm',
  extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['babel-plugin-dynamic-import-node'] : [],
})
