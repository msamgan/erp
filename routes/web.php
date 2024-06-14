<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index']);

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/profile.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/client.php';
require __DIR__ . '/organization.php';
require __DIR__ . '/project.php';
require __DIR__ . '/transaction.php';
require __DIR__ . '/post.php';

Route::middleware('auth')->group(function () {
    Route::get('/media', [MediaController::class, 'index'])
        ->name('media');

    Route::get('/media/unsplash', [MediaController::class, 'unsplash'])
        ->name('media.unsplash');

    Route::post('/media/store', [MediaController::class, 'store'])->name('media.store');

    Route::get('/media/photos', [MediaController::class, 'photos'])
        ->name('media.photos');
});
