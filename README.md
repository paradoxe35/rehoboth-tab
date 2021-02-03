# Rehoboth Tabernacle Website

Ce project est le site officiel de l'eglise Rehoboth tabernacle a Bukavu.
Il a ete pense pour etre open source, donc disponible a tout le monde qui voudrais faire une contribution.

## Outils

Le principal outil de stucturation de ce projet est Laravel.

### - Laravel
Laravel est framework web fait par le language de programmation PHP, pour plus d'information veuillez visiter le site officiel: www.laravel.com.

### - Front-End
Actuellement le site a ete fait sous une pratique de SPA(Single Web Application) mais ce dernier a ete utilisee seulement dans la section client grance a la library inertial avec le library [Preact](https://preactjs.com/), pour plus de details veuillez visiter leur site officiel: https://inertiajs.com/.

### - Autres
Comme dans autres grands projects, celui-ci a utiliser plusieurs composants, library etc. de sorte de vous sentir a l'aise dans la contibution de ce project, veuillez regarder dans les deux principaux fichiers de gestionnaire de packages:
- package.json, pour les libraries nodejs avec NPM | Yarn
- composer.json, pour les liraries php avec Composer

## Installation
- `git clone https://pngwasi@bitbucket.org/pngwasi/rehoboth.git`
- `cd rehoboth`
- `cp .env.example .env`
- `composer install`
- `php artisan key:generate`
- `php artisan webpush:vapid`
- Edit .env
- creer une base de donnee avec mysql (requis)
- `php artisan migrate`
- `yarn install && yarn watch`
- Demarer le server web `php artisan serve`

## Assets Bundler
Pour la compilation des assets:

- Development (ViteJs)
- Production (WebPack).

Ceci dit pour ne pas se compliquer webpack est plus utilise que vite dans dans les deux parties (DEV et PROD).

### Compilation

- `yarn build` pour la production
- `yarn dev` pour le development

## Back Office

Dans la partie administration, y a pas grand chose a dire mis a part le route d'entre est sur le path: `/dash/login`

## License
MIT

Fait par Paradoxe Ngwasi (PNG_)