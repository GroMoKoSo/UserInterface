# === Build-Phase ===
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the Vite app
RUN npm run build

# === Runtime-Phase ===
FROM nginx:1.27

# 4) Entrypoint-Script aus frontend ins Image kopieren
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# 5) Die gebauten Dateien aus dem Build-Stage übernehmen
COPY --from=build /app/dist /usr/share/nginx/html

# 6) Entrypoint setzen
ENTRYPOINT ["/docker-entrypoint.sh"]