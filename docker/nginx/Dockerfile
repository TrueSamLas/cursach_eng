FROM node:24-alpine AS base
WORKDIR /app

FROM base AS install
COPY package.json package-lock.json ./
RUN npm install

FROM base AS build
COPY --from=install /app/node_modules node_modules
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/.output/public /usr/share/nginx/html