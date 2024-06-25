<?php

use App\Http\Controllers\OrganizationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('organization', [OrganizationController::class, 'index'])->name('organization');
    Route::get('organization/create', [OrganizationController::class, 'create'])->name('organization.create');
    Route::post('organization', [OrganizationController::class, 'store'])->name('organization.store');
    Route::get('organization/{organization}', [OrganizationController::class, 'show'])->name('organization.show');
    // Route::get('organization/{organization}/edit', [OrganizationController::class, 'edit'])->name('organization.edit');
    Route::post('organization/{organization}', [OrganizationController::class, 'update'])->name('organization.update');
    Route::delete('organization/{organization}', [OrganizationController::class, 'destroy'])->name('organization.destroy');

    Route::get('api/organization/list', [OrganizationController::class, 'organizationList'])->name('organization.list');
    Route::get('api/organization/last-created', [OrganizationController::class, 'lastCreated'])->name('organization.last_created');
});
