<?php

use App\Http\Controllers\TransactionController;

Route::middleware('auth')->group(function () {
    Route::get('transaction', [TransactionController::class, 'index'])->name('transaction');
    Route::get('transaction/create', [TransactionController::class, 'create'])->name('transaction.create');
    Route::post('transaction', [TransactionController::class, 'store'])->name('transaction.store');
    // Route::get('transaction/{transaction}', [TransactionController::class, 'show'])->name('transaction.show');
    // Route::get('transaction/{transaction}/edit', [TransactionController::class, 'edit'])->name('transaction.edit');
    // Route::post('transaction/{transaction}', [TransactionController::class, 'update'])->name('transaction.update');
    Route::delete('transaction/{transaction}', [TransactionController::class, 'destroy'])->name('transaction.destroy');
});
