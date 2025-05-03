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
