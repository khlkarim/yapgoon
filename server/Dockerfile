# ----------- Stage 1: Build -----------
FROM node:22-alpine AS builder
# Enable corepack for pnpm
RUN corepack enable
# Set working directory
WORKDIR /app
# Copy dependency files first
COPY pnpm-lock.yaml package.json ./
# Install dependencies
RUN pnpm install --frozen-lockfile
# Copy the rest of the app source code
COPY . .
# Build the project (assumes default "build" script calls tsc or nest build)
RUN pnpm build

# ----------- Stage 2: Run -----------
FROM node:22-alpine
# Set working directory
WORKDIR /app
# Enable corepack in case of runtime scripts using pnpm
RUN corepack enable
# Copy only what's needed to run
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# Expose the port your app runs on (change if needed)
EXPOSE 3000
# Run the app (edit this if your entrypoint is different)
CMD ["node", "dist/main.js"]