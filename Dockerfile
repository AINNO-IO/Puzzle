FROM node:20-slim AS base
RUN corepack enable
RUN apt update && apt install curl iputils-ping telnet -y

FROM base AS build-base 
COPY . /app
WORKDIR /app

FROM build-base AS prod-deps
RUN npm install --prod --frozen-lockfile

FROM build-base AS build
RUN npm install --frozen-lockfile
RUN ls
RUN cat .env
RUN npm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/next-env.d.ts /app/next-env.d.ts
COPY --from=build /app/next.config.js /app/next.config.js
WORKDIR /app
EXPOSE 3000
CMD [ "npm", "start"]