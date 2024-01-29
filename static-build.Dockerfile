FROM --platform=linux/amd64 dunglas/frankenphp:static-builder

RUN apk update; \
    apk add --no-cache \
    --repository=https://dl-cdn.alpinelinux.org/alpine/edge/main \
    --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community \
    openssl \
    php83-fileinfo \
    php83-gd \
    php83-curl \
    php83-gmp \
    php83-simplexml \
    php83-xmlreader \
    php83-zip \ 
    php83-pdo_sqlite

# Copy your app
WORKDIR /go/src/app/dist/app
COPY . .

RUN rm -rf database/database.sqlite
RUN rm -rf storage/
RUN rm -rf node_modules
RUN rm -rf vendor
RUN rm -rf .env

RUN cp .env.static-build .env

RUN touch database/database.sqlite

RUN mkdir -p storage/app/public
RUN mkdir -p storage/framework/cache/data
RUN mkdir -p storage/framework/sessions
RUN mkdir -p storage/framework/testing
RUN mkdir -p storage/framework/views
RUN mkdir -p storage/logs

RUN composer install --optimize-autoloader --no-dev

RUN php artisan key:generate
RUN php artisan route:cache
RUN php artisan view:cache
RUN php artisan storage:link
RUN php artisan config:clear

RUN php artisan migrate
RUN php artisan admin:create

# Build the static binary, be sure to select only the PHP extensions you want
WORKDIR /go/src/app/
RUN EMBED=dist/app/ \
    PHP_EXTENSIONS=ctype,pdo_sqlite,gd,gmp,mbstring,tokenizer,simplexml,xmlreader,zip,json,fileinfo   \
    ./build-static.sh