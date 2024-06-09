<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/post', [PostController::class, 'index'])->name('post');
    Route::get('/post/create', [PostController::class, 'create'])->name('post.create');
    Route::post('/post', [PostController::class, 'store'])->name('post.store');
    // Route::get('/post/{post}', [PostController::class, 'show'])->name('post.show');
    Route::get('/post/{post}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::post('/post/{post}', [PostController::class, 'update'])->name('post.update');
    Route::delete('/post/{post}', [PostController::class, 'destroy'])->name('post.destroy');

    Route::get('api/tag/list', [PostController::class, 'tagList'])->name('tag.list');
});
