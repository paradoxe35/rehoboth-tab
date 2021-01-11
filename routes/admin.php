<?php

use App\Http\Controllers\Admin\BlogsController;
use App\Http\Controllers\Admin\EventsController;
use App\Http\Controllers\Admin\GalleriesController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\Models\FilesController;
use App\Http\Controllers\Admin\SermonsController;
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

        Route::resource('/sermons', SermonsController::class);

        Route::resource('/events', EventsController::class);

        Route::resource('/galleries', GalleriesController::class);

        Route::resource('/blogs',  BlogsController::class);

        Route::resource('/messages', MessagesController::class);


        Route::name('files.')
            ->prefix('files')
            ->group(function () {

                Route::delete("{id}/sermon-file", [FilesController::class, "destroySermonFile"])
                    ->name('sermon-file');
            });

        // });
    });
