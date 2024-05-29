FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN npm install -g pnpm@9.0.4
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --filter=api

ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}

ARG AUTH_TRUST_HOST
ENV AUTH_TRUST_HOST=${AUTH_TRUST_HOST}

ARG GOOGLE_SERVICE_ACCOUNT
ENV GOOGLE_SERVICE_ACCOUNT=${GOOGLE_SERVICE_ACCOUNT}

# Build the project
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json

RUN pnpm build --filter=api

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

COPY . .

CMD node ./apps/api/dist/index.js