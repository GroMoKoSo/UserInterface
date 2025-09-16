# Use a lightweight Node.js image as the base
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the dist folder to the container
COPY dist /app/dist

# Install a lightweight HTTP server
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Serve the dist folder
CMD ["serve", "-s", "dist", "-l", "5000"]