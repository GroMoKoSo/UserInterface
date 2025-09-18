#!/bin/sh
# needed for vite to have access to the env variables
cat <<EOF > /usr/share/nginx/html/env.js
window.ENV = {
  BASE_URL: "${BASE_URL}",
}
EOF

exec nginx -g "daemon off;"