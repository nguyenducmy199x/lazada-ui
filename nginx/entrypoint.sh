#!/bin/sh

# Chọn biến môi trường ENV (mặc định là prod)
ENV_MODE=${ENV:-prod}

echo "🛠️  Using Nginx config: $ENV_MODE"

# Copy config tương ứng
cp /etc/nginx/templates/default.$ENV_MODE.conf /etc/nginx/conf.d/default.conf

# Chạy nginx
exec "$@"
