<?php

use App\Http\Controllers\admin\CountryController;
use App\Http\Controllers\admin\SettingController;
use Illuminate\Support\Facades\Route;


Route::controller(CountryController::class)->group(function () {
    Route::get('/admin/countries', 'index')->name('countries.index')->middleware('auth');
    Route::post('/admin/countries', 'store')->name('countries.store')->middleware('auth');
    Route::put('/admin/countries/{country}', 'update')->name('countries.update')->middleware('auth');
    Route::delete('/admin/countries/{country}', 'destroy')->name('countries.destroy')->middleware('auth');
});



Route::controller(SettingController::class)->group(function(){
    Route::get('/admin/settings', 'index')->name('settings.index')->middleware('auth');
    Route::put('/admin/settings/{setting}', 'update')->name('settings.update')->middleware('auth');
    Route::delete('/admin/settings/{setting}', 'destroy')->name('settings.destroy')->middleware('auth');
});