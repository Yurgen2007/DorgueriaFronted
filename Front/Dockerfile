# Stage 1: Build stage
FROM node:22.9.0-alpine3.19 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --force

# Copy source code
COPY . .

# Copy production environment variables
COPY .env.production .env.production

# Build the application
RUN npm run build

# Stage 2: Production stage with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
