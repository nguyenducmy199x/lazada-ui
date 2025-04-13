# 👉 Build Stage
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production --output-path=dist/mylazada --base-href=/
RUN echo "✅ Listing dist folder:" && ls -la dist/mylazada

# 👉 Serve Stage
FROM nginx:alpine

# Copy Angular dist từ stage build
COPY --from=build /app/dist/mylazada /usr/share/nginx/html

# Xóa default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy các file cấu hình nginx tùy môi trường
COPY nginx/default.prod.conf /etc/nginx/templates/default.prod.conf
COPY nginx/default.dev.conf /etc/nginx/templates/default.dev.conf

# Copy entrypoint script
COPY nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Entrypoint tự động chọn config theo biến môi trường ENV
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
