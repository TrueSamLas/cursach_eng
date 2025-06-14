FROM node:24-alpine AS base
WORKDIR /app

FROM base AS install
COPY package.json package-lock.json ./
RUN npm install

FROM base AS build
COPY --from=install /app/node_modules node_modules
COPY . .
RUN npm run build

FROM base
COPY --from=build /app/.output .output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
