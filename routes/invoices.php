<?php

use App\Http\Controllers\vendor\InvoiceController;
use App\Http\Controllers\vendor\InvoiceTypeController;
use Illuminate\Support\Facades\Route;

Route::controller(InvoiceTypeController::class)->group(function () {
    Route::get('/invoices-types', 'index')->name('invoices-types.index');
    Route::post('/invoice-types',  'store')->name('invoice-types.store');
    Route::put('/invoice-types/{invoiceType}', 'update')->name('invoice-types.update');
    Route::delete('/invoice-types/{invoiceType}', 'destroy')->name('invoice-types.destroy');
});





Route::controller(InvoiceController::class)->group(function () {
    Route::get('/invoices', 'index')->name('invoices.index');
    Route::post('/invoices',  'store')->name('invoices.store');
    Route::put('/invoices/{invoice}', 'update')->name('invoices.update');
    Route::delete('/invoices/{invoice}', 'destroy')->name('invoices.destroy');
});