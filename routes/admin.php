<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\CountryController;


Route::controller(CountryController::class)->group(function () {
    Route::get('/admin/countries', 'index')->name('countries.index');
    Route::post('/admin/countries', 'store')->name('countries.store');
    Route::put('/admin/countries/{country}', 'update')->name('countries.update');
    Route::delete('/admin/countries/{country}', 'destroy')->name('countries.destroy');
});