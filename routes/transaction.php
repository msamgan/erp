<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('transaction', [TransactionController::class, 'index'])->name('transaction');
    Route::get('transaction/create', [TransactionController::class, 'create'])->name('transaction.create');
    Route::post('transaction', [TransactionController::class, 'store'])->name('transaction.store');

    Route::get('api/transaction/list/paginated', [TransactionController::class, 'transactionListPaginated'])
        ->name('transaction.list.paginated');
    Route::get('api/transaction/descriptions', [TransactionController::class, 'descriptions'])->name('transaction.descriptions');
});
