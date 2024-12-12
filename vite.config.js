import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需加载
// import styleImport from 'vite-plugin-style-import'
// import { resolve } from 'path'

// https://vitejs.dev/config/


export default defineConfig({
  plugins: [vue()],
  // publicPath: '/GDP-Data-Visualization/',
  base: '/', // 静态资源路径
  server: {
    port: 5000, // 固定端口
    open: true, // 自动打开浏览器
    cors: true, // 支持跨域
    // fs: {
    //   allow: ['src', 'assets', 'public'], // 增加访问权限
    // },
  },
  build: {
    chunkSizeWarningLimit:1500,
    rollupOptions: {
        output:{
            manualChunks(id) {
              if (id.includes('node_modules')) {
                
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
          }
        }
    }
  }
})


// https://vitejs.dev/config/
// export default defineConfig({
  // 
  // 
// })