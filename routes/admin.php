<?php

use App\Http\Controllers\Admin\BlogsController;
use App\Http\Controllers\Admin\EventsController;
use App\Http\Controllers\Admin\GalleriesController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\MessagesController;
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
        Route::get('/sermons', [SermonsController::class, 'index'])->name('sermons');
        Route::get('/events', [EventsController::class, 'index'])->name('events');
        Route::get('/galleries', [GalleriesController::class, 'index'])->name('galleries');
        Route::get('/blogs', [BlogsController::class, 'index'])->name('blogs');
        Route::get('/messages', [MessagesController::class, 'index'])->name('messages');
        // });
    });
