# 👉 Build Stage
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production --output-path=dist/mylazada --base-href=/

# 👉 Serve Stage
FROM nginx:latest
COPY --from=build /app/dist/mylazada /usr/share/nginx/html

# Gỡ config mặc định & thêm config custom nếu muốn
RUN rm /etc/nginx/conf.d/default.conf

# Optional: Tạo config Nginx để Angular xử lý route
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

