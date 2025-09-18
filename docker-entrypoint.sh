#!/bin/sh
# needed for vite to have access to the env variables
cat <<EOF > /usr/share/nginx/html/env.js
window.ENV = {
    BASE_URL: "${BASE_URL}",
}
EOF

# Update Nginx configuration to listen on port 8080
sed -i 's/listen 80;/listen 8080;/' /etc/nginx/conf.d/default.conf

exec nginx -g "daemon off;"