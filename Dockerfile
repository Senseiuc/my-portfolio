# BUILDER STAGE
FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# RUNTIME STAGE
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies (better-sqlite3 requires compilation)
COPY package*.json ./
RUN apk add --no-cache python3 make g++ && \
    npm ci --omit=dev && \
    apk del python3 make g++

# Copy built frontend assets
COPY --from=builder /app/dist ./dist
# Copy compiled backend assets
COPY --from=builder /app/dist-server ./dist-server

# Public assets are already copied into dist by Vite.
COPY ["resume.html", "./dist/resume.html"]
COPY ["resume.md", "./dist/resume.md"]
COPY ["public/favicon.svg", "./dist/public/favicon.svg"]
COPY ["public/resume.js", "./dist/public/resume.js"]

# Set non-root user for security compliance
USER node

EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist-server/server.js"]
