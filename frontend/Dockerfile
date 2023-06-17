# Build
FROM node:16.20-alpine3.17 AS build-stage

RUN addgroup -S appgroup && adduser -S appuser -G appgroup -s /bin/sh

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

USER root

RUN chown -R appuser:appgroup /app

USER appuser

RUN npm install

COPY . .

USER appuser

RUN npm run build

# Prod
FROM nginx:1.24.0 AS production-stage

RUN groupadd appgroup && \
    useradd --no-log-init -r -g appgroup appuser && \
    mkdir -p /var/cache/nginx/client_temp && \
    chown -R appuser:appgroup /var/cache/nginx

COPY --from=build-stage /app/dist/front-end /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R appuser:appgroup /usr/share/nginx/html

USER appuser

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
