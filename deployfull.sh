#!/bin/bash

# Dừng script nếu có lỗi
set -e
# 1. Build Angular app (hoặc bỏ qua nếu đã build rồi)
echo "🔧 Building Angular app..."
ng build
# 2. Build Docker image
echo "🐳 Building Docker image..."
docker build -t mylazada .
# 3. Gắn thẻ image
echo "🏷️ Tagging image..."
docker tag mylazada myn199x/mylazada:latest
# 4. Push image lên Docker Hub
echo "📤 Pushing to Docker Hub..."
docker push myn199x/mylazada:latest
echo "✅ Done!"


ssh -i "mylazada.pem" ubuntu@ec2-52-62-99-94.ap-southeast-2.compute.amazonaws.com



# Dừng nếu có lỗi
set -e

# ========== [1] Dừng và xóa container cũ ==========
echo "🛑 Stopping and removing old container..."
docker stop mylazada || true
docker rm mylazada || true

# ========== [2] Xóa các images cũ ==========
echo "🧹 Removing old Docker images..."
docker rmi myn199x/mylazada:latest || true

# ========== [3] Pull image mới từ Docker Hub ==========
echo "📥 Pulling latest image from Docker Hub..."
docker pull myn199x/mylazada:latest

# ========== [4] Chạy lại container với cấu hình mới ==========
echo "🚀 Running new container..."
docker run -d --name mylazada --network=my-network -p 4200:80 myn199x/mylazada:latest

echo "✅ Redeploy complete! New container is running."




# ========== [1] Cấu hình ==========
PEM_PATH="D:/aws/mylazada.pem"         # Đường dẫn đến file .pem
LOCAL_DIST_PATH="dist/mylazada"        # Thư mục build Angular (local)
REMOTE_USER="ubuntu"
REMOTE_HOST="52.62.99.94"
REMOTE_TEMP_PATH="/home/ubuntu/mylazada"
NGINX_HTML_PATH="/usr/share/nginx/html"

# ========== [2] Copy thư mục dist/mylazada lên server ==========
echo "📤 Copying local dist folder to remote server..."
scp -i "$PEM_PATH" -r "$LOCAL_DIST_PATH" "$REMOTE_USER@$REMOTE_HOST:/home/ubuntu/"

# ========== [3] Di chuyển thư mục build vào thư mục Nginx ==========
echo "🚚 Moving files to Nginx HTML directory on remote server..."
ssh -i "$PEM_PATH" "$REMOTE_USER@$REMOTE_HOST" << EOF
  sudo rm -rf $NGINX_HTML_PATH/*
  sudo mv $REMOTE_TEMP_PATH/* $NGINX_HTML_PATH/
  sudo rm -rf $REMOTE_TEMP_PATH
EOF

echo "✅ Deployment to AWS complete!"