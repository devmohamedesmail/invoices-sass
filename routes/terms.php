<?php

use App\Http\Controllers\vendor\TermsController;
use Illuminate\Support\Facades\Route;





Route::controller(TermsController::class)->group(function(){
    Route::get('/terms/condition','index')->name("terms.conditions")->middleware("auth");
    Route::post('/terms/condition','store')->name("terms.conditions.store")->middleware("auth");
    Route::put('/terms/condition/{term}', 'update')->name('terms.conditions.update')->middleware('auth');
    Route::delete('/terms/condition/{term}', 'destroy')->name('terms.conditions.destroy')->middleware('auth');
});



