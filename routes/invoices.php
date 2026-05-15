<?php

use App\Http\Controllers\vendor\ClientController;
use App\Http\Controllers\vendor\InvoiceController;
use App\Http\Controllers\vendor\InvoiceTypeController;
use Illuminate\Support\Facades\Route;

/* ── Invoice Types ── */
Route::controller(InvoiceTypeController::class)->group(function () {
    Route::get('/invoices-types',              'index')->name('invoices-types.index')->middleware('auth');
    Route::post('/invoice-types',              'store')->name('invoice-types.store')->middleware('auth');
    Route::put('/invoice-types/{invoiceType}', 'update')->name('invoice-types.update')->middleware('auth');
    Route::delete('/invoice-types/{invoiceType}', 'destroy')->name('invoice-types.destroy')->middleware('auth');
});

/* ── Invoices ── */
Route::controller(InvoiceController::class)->group(function () {
    Route::get('/invoices',              'index')->name('invoices.index')->middleware('auth');
    Route::get('/invoices/create',       'create')->name('invoices.create')->middleware('auth');
    Route::post('/invoices',             'store')->name('invoices.store')->middleware('auth');
    Route::get('/invoices/edit/{invoice}',    'edit_page')->name('invoices.edit')->middleware('auth');
    Route::put('/invoices/{invoice}',    'update')->name('invoices.update')->middleware('auth');
    Route::get('/invoices/show/{invoice}',    'show')->name('invoices.show')->middleware('auth');
    Route::get('/invoices/show/preview/{invoice}',    'show_preview')->name('invoices.show.preview')->middleware('auth');
    Route::get('/invoices/show/pdf/{invoice}',    'show_pdf')->name('invoices.show.pdf')->middleware('auth');
    Route::delete('/invoices/{invoice}', 'destroy')->name('invoices.destroy')->middleware('auth');
});

/* ── Clients ── */
Route::controller(ClientController::class)->group(function () {
    Route::get('/clients',             'index')->name('clients.index')->middleware('auth');
    Route::post('/clients',            'store')->name('clients.store')->middleware('auth');
    Route::put('/clients/{client}',    'update')->name('clients.update')->middleware('auth');
    Route::delete('/clients/{client}', 'destroy')->name('clients.destroy')->middleware('auth');
});