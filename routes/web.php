<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SermonController;
use App\Http\Controllers\WebPush\WebPushController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::name('guest.')
    ->group(function () {

        Route::get('/', [HomeController::class, 'index'])->name('home');

        Route::get('/events', [EventController::class, 'index'])->name('events');

        Route::get('/sermons', [SermonController::class, 'index'])->name('sermons');

        Route::get('/blog', [BlogController::class, 'index'])->name('blog');

        Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

        Route::get('/contact', [ContactController::class, 'index'])->name('contact');

        Route::prefix('web-push')
            ->name('web-push')
            ->group(function () {
                Route::get('/vapid-public-key', [WebPushController::class, 'vapidPublicKey'])->name('vapid-public-key');
                Route::get('/register', [WebPushController::class, 'register'])->name('register');
            });
    });

require __DIR__ . '/admin.php';
