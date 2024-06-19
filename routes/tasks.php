<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('task', [TaskController::class, 'index'])->name('task');
    Route::get('task/create', [TaskController::class, 'create'])->name('task.create');
    Route::post('task', [TaskController::class, 'store'])->name('task.store');
    // Route::get('task/{task}', [TaskController::class, 'show'])->name('task.show');
    Route::get('task/{task}/edit', [TaskController::class, 'edit'])->name('task.edit');
    Route::post('task/{task}', [TaskController::class, 'update'])->name('task.update');
    Route::delete('task/{task}', [TaskController::class, 'destroy'])->name('task.destroy');

    Route::post('api/task/complete', [TaskController::class, 'complete'])->name('task.complete');
    Route::get('api/task/list', [TaskController::class, 'taskList'])->name('task.list');
});
