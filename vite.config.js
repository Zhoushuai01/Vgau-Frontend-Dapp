import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    uni(),
  
  ],
  server: {
    host: '0.0.0.0', // 允许所有IP访问
    port: 5173, // 指定端口
    open: true, // 自动打开浏览器
    cors: true, // 启  用CORS
    proxy: {
      '/api': {
    //代理
        target: 'http://192.168.1.100:8080', 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "api": path.resolve(__dirname, "./src/api/apiService.js"),
    },
  },
  // 构建配置（移除 dapp 前缀，使用标准命名）
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});