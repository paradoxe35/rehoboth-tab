deploy-heroku:
	git push heroku master
	heroku run "php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force && composer install --optimize-autoloader --no-dev"

server:
	php artisan serve --host=0.0.0.0
