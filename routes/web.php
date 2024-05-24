<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index']);

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/profile.php';
require __DIR__.'/auth.php';
require __DIR__.'/client.php';
require __DIR__.'/organization.php';
require __DIR__.'/project.php';
require __DIR__.'/transaction.php';
