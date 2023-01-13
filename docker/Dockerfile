# Build phase
FROM node:16-alpine AS builder

WORKDIR /app

# Prepare node_modules
COPY ./.yarn ./.yarn
COPY ./package.json ./yarn.lock .yarnrc ./
RUN yarn install --frozen-lockfile --production
RUN yarn build

# Run phase
FROM node:16-alpine AS runner

WORKDIR /app

COPY --from=builder /app .

# Copy artifacts
COPY ./next.config.js .
COPY ./public ./public
COPY ./.next ./.next

CMD ["yarn", "start"]
