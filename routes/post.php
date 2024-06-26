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

    Route::get('api/post/latest', [PostController::class, 'latestPost'])->name('api.post.latest');
});

// public API routes
Route::get('api/tag/list', [PostController::class, 'tagList'])->name('api.tag.list');
Route::get('api/post/list', [PostController::class, 'postList'])->name('api.post.list');
Route::get('api/post/list/paginated', [PostController::class, 'postListPaginated'])->name('api.post.list.paginated');
Route::get('api/post/{slug}', [PostController::class, 'postShow'])->name('api.post.show');
Route::get('api/post/tag/{tag}', [PostController::class, 'postTag'])->name('api.post.tag');
