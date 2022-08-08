FROM  node:16-alpine AS builder

WORKDIR /front

COPY . .

RUN npm install
RUN npm run build:prod

FROM nginx:1.21.6-alpine as runner

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /front/build /var/www/html

EXPOSE 8080