# 👉 Build Stage
FROM node:20 AS build
WORKDIR /app

# Sao chép file package.json và cài đặt các dependency
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn vào trong container
COPY . .

# Build ứng dụng Angular với cấu hình production
RUN npm run build -- --configuration=production --output-path=dist/mylazada --base-href=/

# 👉 Serve Stage
FROM nginx:latest

# Sao chép các file đã build từ Build Stage vào thư mục của Nginx
COPY --from=build /app/dist/mylazada /usr/share/nginx/html

# Mở port 80 cho Nginx
EXPOSE 80

# Chạy Nginx trong chế độ không daemon
CMD ["nginx", "-g", "daemon off;"]
