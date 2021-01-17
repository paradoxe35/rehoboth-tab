<?php

use App\Http\Controllers\Admin\BlogsController;
use App\Http\Controllers\Admin\EventsController;
use App\Http\Controllers\Admin\GalleriesController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\Morph\FilesController;
use App\Http\Controllers\Admin\Morph\ImagesController;
use App\Http\Controllers\Admin\SermonsController;
use App\Http\Controllers\Organizers\OrganizersController;
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

        // Route::middleware('auth')
        //     ->group(function () {
        Route::get('/home', [HomeController::class, 'index'])->name('home');

        Route::resource('/sermons', SermonsController::class)->only([
            'index', 'create', 'edit'
        ]);

        Route::resource('/events', EventsController::class);
        
        Route::resource('/events', EventsController::class);

        Route::resource('/galleries', GalleriesController::class);

        Route::resource('/blogs',  BlogsController::class);

        Route::resource('/messages', MessagesController::class);


        Route::apiResource("files", FilesController::class);
        Route::apiResource("images", ImagesController::class);
        Route::apiResource("tags", TagsController::class);
        Route::apiResource("organizers", OrganizersController::class);

        // });
    });
