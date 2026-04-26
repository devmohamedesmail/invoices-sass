<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/vendor/dashboard', function () {
    return Inertia::render('vendor/index');
})->name('vendor.dashboard');