# Build stage
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

# Production stage
FROM node:16-alpine AS production

WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Install serve globally
RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "dist", "-l", "5000"]