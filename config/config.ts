import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    ENV: process.env.UMI_ENV,
  },
  npmClient: 'npm',
})
