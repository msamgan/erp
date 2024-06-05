<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('project', [ProjectController::class, 'index'])->name('project');
    Route::get('project/create', [ProjectController::class, 'create'])->name('project.create');
    Route::post('project', [ProjectController::class, 'store'])->name('project.store');
    Route::get('project/{project}', [ProjectController::class, 'show'])->name('project.show');
    Route::get('project/{project}/edit', [ProjectController::class, 'edit'])->name('project.edit');
    Route::post('project/{project}', [ProjectController::class, 'update'])->name('project.update');
    Route::delete('project/{project}', [ProjectController::class, 'destroy'])->name('project.destroy');

    Route::get('api/project/list', [ProjectController::class, 'projectList'])->name('project.list');
});
