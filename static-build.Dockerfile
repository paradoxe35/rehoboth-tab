FROM --platform=linux/amd64 dunglas/frankenphp:static-builder

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
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

RUN sed -i 's|APP_ADMIN_PASSWORD=password|APP_ADMIN_PASSWORD=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 13; echo)|g' .env

RUN php artisan migrate
RUN php artisan db:seed


# Build the static binary, be sure to select only the PHP extensions you want
WORKDIR /go/src/app/
RUN EMBED=dist/app/ \
    PHP_EXTENSIONS=ctype,iconv,pdo_sqlite,gd,mbstring,tokenizer,xml,json,fileinfo   \
    ./build-static.sh