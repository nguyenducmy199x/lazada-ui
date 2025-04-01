# Build Stage
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Serve Stage
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/lazada-ui /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

