<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\vendor\CompanyController;

Route::controller(CompanyController::class)->group(function () {
    Route::get('/companies', 'index')->name('companies.index')->middleware('auth');
    Route::get('/companies/create/page', 'createPage')->name('companies.create.page')->middleware('auth');
    Route::post('/companies/store', 'storeCompany')->name('companies.store')->middleware('auth');
    Route::get('/companies/edit/page', 'editPage')->name('companies.edit.page')->middleware('auth');
    Route::put('/companies/{company}', 'updateCompany')->name('companies.update')->middleware('auth');
});