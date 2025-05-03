#!/bin/bash

# Dừng nếu có lỗi
set -e

# ========== [0] Cấu hình ==========
PEM_PATH="D:/aws/mylazada.pem"              # Đường dẫn đến file .pem
REMOTE_USER="ubuntu"
REMOTE_HOST="52.62.99.94"
REMOTE="ssh -i $PEM_PATH $REMOTE_USER@$REMOTE_HOST"

# ========== [1] Build Angular ==========
echo "🔧 Building Angular app..."
ng build

# ========== [2] Build Docker image ==========
echo "🐳 Building Docker image..."
docker build -t mylazada .

# ========== [3] Tag image ==========
echo "🏷️ Tagging image..."
docker tag mylazada myn199x/mylazada:latest

# ========== [4] Push lên Docker Hub ==========
echo "📤 Pushing to Docker Hub..."
docker push myn199x/mylazada:latest

# ========== [5] SSH vào EC2 và redeploy ==========
echo "🔐 Connecting to EC2 and redeploying..."

$REMOTE << 'EOF'
  set -e
  echo "🛑 Stopping and removing old container..."
  docker stop mylazada || true
  docker rm mylazada || true

  echo "🧹 Removing old image..."
  docker rmi myn199x/mylazada:latest || true

  echo "📥 Pulling latest image..."
  docker pull myn199x/mylazada:latest

  echo "🚀 Running new container..."
  docker run -d --name mylazada --network=my-network -p 4200:80 myn199x/mylazada:latest

  echo "✅ Redeploy complete!"
EOF
