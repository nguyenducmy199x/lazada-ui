#!/bin/bash

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
