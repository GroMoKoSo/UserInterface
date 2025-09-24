#!/bin/sh
# needed for vite to have access to the env variables
cat <<EOF > /usr/share/nginx/html/env.js
window.ENV = {
    VITE_BASE_URL: "${BASE_URL}",
    VITE_KEYCLOAK_URL: "${VITE_KEYCLOAK_URL}",
    VITE_USERMANAGEMENT_URL: "${VITE_USERMANAGEMENT_URL}",
    VITE_APIMANAGEMENT_URL: "${VITE_APIMANAGEMENT_URL}"
}
EOF



exec nginx -g "daemon off;"