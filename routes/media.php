<?php

use App\Http\Controllers\MediaController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/media', [MediaController::class, 'index'])->name('media');
    Route::get('/media/unsplash', [MediaController::class, 'unsplash'])->name('media.unsplash');
    Route::post('/media/store', [MediaController::class, 'store'])->name('media.store');
    Route::get('/media/photos', [MediaController::class, 'photos'])->name('media.photos');
});

Route::get('search/photos', [MediaController::class, 'proxyPhotos'])->name('api.media.photos');
