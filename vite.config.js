import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  
  ],
  server: {
    host: '0.0.0.0', // 允许所有IP访问
    port: 5173, // 指定端口
    open: true, // 自动打开浏览器
    cors: true, // 启用CORS
    proxy: {
      '/api': {
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
});
