deploy-heroku:
	git push heroku master
	heroku run "php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force && composer install --optimize-autoloader --no-dev"

server:
	php artisan serve --host=0.0.0.0


.PHONY: mysql-dev-docker
mysql-dev-docker:
	docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=rehoboth -p 3306:3306 -d mysql:8.0
