import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: '/dapp/',
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
        // 修改:target: 'http://192.168.1.100:8080',
        target: 'https://verigold.ai/', // 请替换为实际的服务器地址和端口
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
  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 确保DApp的资源文件名与主站不同，避免冲突
        entryFileNames: 'assets/dapp-[hash].js',
        chunkFileNames: 'assets/dapp-[hash].js',
        assetFileNames: 'assets/dapp-[hash].[ext]'
      }
    }
  }
});