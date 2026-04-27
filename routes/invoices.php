<?php

use App\Http\Controllers\vendor\ClientController;
use App\Http\Controllers\vendor\InvoiceController;
use App\Http\Controllers\vendor\InvoiceTypeController;
use Illuminate\Support\Facades\Route;

/* ── Invoice Types ── */
Route::controller(InvoiceTypeController::class)->group(function () {
    Route::get('/invoices-types',              'index')->name('invoices-types.index');
    Route::post('/invoice-types',              'store')->name('invoice-types.store');
    Route::put('/invoice-types/{invoiceType}', 'update')->name('invoice-types.update');
    Route::delete('/invoice-types/{invoiceType}', 'destroy')->name('invoice-types.destroy');
});

/* ── Invoices ── */
Route::controller(InvoiceController::class)->group(function () {
    Route::get('/invoices',              'index')->name('invoices.index');
    Route::get('/invoices/create',       'create')->name('invoices.create');
    Route::post('/invoices',             'store')->name('invoices.store');
    Route::put('/invoices/{invoice}',    'update')->name('invoices.update');
    Route::get('/invoices/show/{invoice}',    'show')->name('invoices.show');
    Route::delete('/invoices/{invoice}', 'destroy')->name('invoices.destroy');
});

/* ── Clients ── */
Route::controller(ClientController::class)->group(function () {
    Route::get('/clients',             'index')->name('clients.index');
    Route::post('/clients',            'store')->name('clients.store');
    Route::put('/clients/{client}',    'update')->name('clients.update');
    Route::delete('/clients/{client}', 'destroy')->name('clients.destroy');
});