# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.13.0

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app
ENV NODE_ENV=production

FROM base AS dependencies
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM dependencies AS build
COPY . .
RUN npm run build

FROM base AS production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nuxt
COPY --from=build --chown=nuxt:nodejs /usr/src/app/.output /usr/src/app/.output
USER nuxt
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
