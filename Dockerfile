FROM node:18-alpine as builder

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./
RUN npm install

# 复制源代码并构建 H5 版本
COPY . .
ENV NODE_ENV=production
RUN npm run build:h5

# 使用 nginx 作为生产服务器
FROM nginx:alpine
COPY --from=builder /app/dist/build/h5 /usr/share/nginx/html

# nginx 配置（修复 MIME 与 SPA 回退）
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    include /etc/nginx/mime.types;\n\
    types { application/javascript js mjs; application/wasm wasm; }\n\
    default_type application/octet-stream;\n\
    # 静态产物（uni-app H5 构建通常在 /assets/ 或同级）\n\
    location ~* \\.(?:js|mjs|css|wasm|map)$ {\n\
        try_files $uri =404;\n\
        add_header Cache-Control "public, max-age=31536000, immutable";\n\
    }\n\
    location /assets/ {\n\
        try_files $uri =404;\n\
        add_header Cache-Control "public, max-age=31536000, immutable";\n\
    }\n\
    # 其余请求回退给前端路由\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
