import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需加载
// import styleImport from 'vite-plugin-style-import'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
<<<<<<< HEAD
  // base: "/GDP-Data-Visualization/",
  build: {
    outDir: "docs",
=======
  base: "/GDP-Data-Visualization/",
  build: {
>>>>>>> ca0d3c3 (test 2)
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