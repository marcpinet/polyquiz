FROM node:16.20-alpine3.17 AS build-stage

RUN addgroup -S appgroup && adduser -S appuser -G appgroup -s /bin/sh

WORKDIR /app

COPY package*.json ./

RUN chown -R appuser:appgroup /app && su appuser -c "npm install"

COPY . .

FROM node:16.20-alpine3.17 AS production-stage

RUN addgroup -S appgroup && adduser -S appuser -G appgroup -s /bin/sh

WORKDIR /app

COPY --from=build-stage /app /app
COPY --from=build-stage /app/node_modules /app/node_modules

USER appuser

EXPOSE 9428

CMD ["npm", "start"]
