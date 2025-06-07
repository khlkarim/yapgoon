# ----------- Stage 1: Build -----------
FROM node:22-alpine AS builder
# Enable corepack (includes pnpm in Node 16+)
RUN corepack enable
# Set working directory
WORKDIR /app
# Copy dependency files first (for layer caching)
COPY pnpm-lock.yaml package.json ./
# Install dependencies without running postinstall scripts
RUN pnpm install --frozen-lockfile
# Copy the rest of the application
COPY . .
# Build the app
RUN pnpm run build

# ----------- Stage 2: Serve with Nginx -----------
FROM nginx:alpine
# Remove default static files
RUN rm -rf /usr/share/nginx/html/*
# Copy the built app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]