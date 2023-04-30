import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import { ViteAliases } from 'vite-aliases'
import path from 'path'

const publicDirMap = {
  'development': 'dev',
  'test': 'test',
  'simulation': 'sim',
  'production': 'prod',
}

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    ViteAliases(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/css/global.scss";',
      },
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: publicDirMap[mode] || 'prod',
  },
  envPrefix: 'APTX_', // 设置env文件可见变量默认前缀
})
