# Deploy

# B1 :
# run local ng build -> tạo folder dist/mylazada

# B2:

# run local các lệnh sau
# docker build -t mylazada .
# docker tag mylazada  myn199x/mylazada:latest
# docker push myn199x/mylazada:latest

# run trên server 
# docker run -d --name mylazada --network=my-network -p 4200:80 myn199x/mylazada:latest
# copy file nginx từ folder project vào thư mục /etc/nginx/nginx.conf 

# copy files index.html... từ folder dist/mylazada (local) vào thư mục trên server /usr/share/nginx/html
# máy vps
[//]: # (#  scp -r dist/mylazada root@103.27.239.229:/usr/share/nginx/html/)
# aws
# scp -i "D:\aws\mylazada.pem" -r dist/mylazada ubuntu@52.62.99.94:/home/ubuntu/


# đảm bảo /usr/share/nginx/html/mylazada/browser có files mới copy từ local 
location / {
         root /usr/share/nginx/html/mylazada/browser;
         index index.html;
         try_files $uri $uri/ /index.html;
     }

# sudo systemctl restart  nginx - > run web
