<?php

use App\Http\Controllers\admin\CountryController;
use App\Http\Controllers\admin\SettingController;
use Illuminate\Support\Facades\Route;


Route::controller(CountryController::class)->group(function () {
    Route::get('/admin/countries', 'index')->name('countries.index');
    Route::post('/admin/countries', 'store')->name('countries.store');
    Route::put('/admin/countries/{country}', 'update')->name('countries.update');
    Route::delete('/admin/countries/{country}', 'destroy')->name('countries.destroy');
});



Route::controller(SettingController::class)->group(function(){
    Route::get('/admin/settings', 'index')->name('settings.index');
    Route::put('/admin/settings/{setting}', 'update')->name('settings.update');
    Route::delete('/admin/settings/{setting}', 'destroy')->name('settings.destroy');
});