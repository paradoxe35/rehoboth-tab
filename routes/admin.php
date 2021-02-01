<?php

use App\Http\Controllers\Admin\Blogs\BlogsCategoriesController;
use App\Http\Controllers\Admin\Blogs\BlogsController;
use App\Http\Controllers\Admin\EventsController;
use App\Http\Controllers\Admin\GalleriesController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\Morph\FilesController;
use App\Http\Controllers\Admin\Morph\ImagesController;
use App\Http\Controllers\Admin\SermonsController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Organizers\OrganizersController;
use App\Http\Controllers\Services\OgController;
use App\Http\Controllers\Tags\TagsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;


Route::prefix('dash')
    ->name('admin.')
    ->group(function () {
        Route::redirect('/', '/dash/login');

        Auth::routes([
            'login' => true,
            'register' => false,
            'verify' => false,
            'reset' => false,
            'confirm' => false
        ]);

        Route::middleware('auth')
            ->group(function () {
                Route::get('/home', [HomeController::class, 'index'])->name('home');

                Route::resource('/sermons', SermonsController::class)->only([
                    'index', 'create', 'edit'
                ]);

                Route::resource('/events', EventsController::class);
                Route::post('/events/{event}/updateEvent', [EventsController::class, 'updateEvent'])->name('events.updateEvent');
                Route::get('/events/{event}/registrations', [EventsController::class, 'registrations'])->name('events.registrations');

                Route::resource('/galleries', GalleriesController::class)->only(['index', 'destroy', 'store']);
                Route::get('/galleries/images', [GalleriesController::class, 'getImages'])->name('galleries.images');
                Route::get('/galleries/articles', [GalleriesController::class, 'articles'])->name('galleries.articles');

                Route::resource('/blogs',  BlogsController::class)->only([
                    'index', 'store', 'update', 'create', 'show', 'destroy'
                ]);
                Route::get('blogs/{blog}/profile', [BlogsController::class, 'showProfile'])->name('blogs.show.profile');
                Route::get('blogs/{blog}/content', [BlogsController::class, 'showContent'])->name('blogs.show.content');
                Route::get('blogs/{blog}/comments', [BlogsController::class, 'showComments'])->name('blogs.show.comments');

                Route::apiResource('/blog-categories', BlogsCategoriesController::class)->only([
                    'index', 'store', 'destroy'
                ]);

                Route::resource('/messages', MessagesController::class)->only(['index', 'update']);


                Route::apiResource("files", FilesController::class);
                Route::apiResource("images", ImagesController::class);
                Route::apiResource("tags", TagsController::class);
                Route::apiResource("organizers", OrganizersController::class);

                Route::get('settings/profiles', [SettingsController::class, 'profiles'])->name('settings.profiles');
                Route::get('settings/church-details', [SettingsController::class, 'churchDetails'])->name('settings.church-details');
            });

        Route::get('/og-meta', OgController::class)->name('og-meta');
    });
