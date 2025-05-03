#!/bin/bash

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
