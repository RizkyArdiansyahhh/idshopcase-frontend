# ── Stage 1: Install ALL dependencies (needed for build) ──────────────────
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Stage 2: Build Next.js ────────────────────────────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build argument for API URL — injected at build time
ARG NEXT_PUBLIC_API_URL=https://api.idshopcase.com/api
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Enable Next.js standalone output for smaller Docker images
RUN npm run build

# ── Stage 3: Production image ─────────────────────────────────────────────
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S appgroup && \
    adduser  -S appuser -u 1001 -G appgroup

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER appuser

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000 || exit 1

CMD ["node", "server.js"]
