<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\vendor\CompanyController;

Route::controller(CompanyController::class)->group(function () {
    Route::get('/companies', 'index')->name('companies.index');
    Route::get('/companies/create/page', 'createPage')->name('companies.create.page');
    Route::post('/companies/store', 'storeCompany')->name('companies.store');
    Route::get('/companies/edit/page', 'editPage')->name('companies.edit.page');
    Route::put('/companies/{company}', 'updateCompany')->name('companies.update');
});