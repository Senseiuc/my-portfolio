# BUILDER STAGE
FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# RUNTIME STAGE
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies (better-sqlite3 requires compilation)
COPY package*.json ./
RUN apk add --no-cache python3 make g++ && \
    npm install --omit=dev && \
    apk del python3 make g++

# Copy built frontend assets
COPY --from=builder /app/dist ./dist
# Copy compiled backend assets
COPY --from=builder /app/dist-server ./dist-server

# Copy assets and files
COPY ["My Brand Logo - senseiuc.png", "./dist/My Brand Logo - senseiuc.png"]
COPY ["My Brand Logo - senseiuc.svg", "./dist/My Brand Logo - senseiuc.svg"]
COPY ["background-senseiuc-design.png", "./dist/background-senseiuc-design.png"]
COPY ["Bearded_logo_glowing_orange_energy_202607140039.mp4", "./dist/Bearded_logo_glowing_orange_energy_202607140039.mp4"]
COPY ["gideon_caricature.jpg", "./dist/gideon_caricature.jpg"]
COPY ["resume.html", "./dist/resume.html"]
COPY ["resume.md", "./dist/resume.md"]

# Set non-root user for security compliance
USER node

EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist-server/server.js"]
