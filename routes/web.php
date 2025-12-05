<?php

use App\Http\Controllers\GuestCertificateController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ResidentDashboardController;
use App\Http\Controllers\TodolistController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\adminController;
use App\Http\Controllers\documentLibraryController;
use App\Http\Controllers\RequestedCertificateController;
use App\Http\Middleware\EnsureTokenIsValid;
use App\Models\User;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Prompts\Concerns\Fallback;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('guest-form', function () {
    return Inertia::render('guestForm');
})->name('guest.form');

Route::post('guest-certificate-request', [GuestCertificateController::class, 'store'])->name('guest.certificate.request');


// staff
Route::middleware(['auth','verified','role:staff'])->group(function(){
    Route::get('staffdashboard', function () {
        return Inertia::render('auth/staffdashboard');
    })->name('staffdashboard');
});

// admin
Route::middleware(['auth','verified','role:admin'])->group(function(){
    Route::get('admin/accountmanagement', function () {
        return Inertia::render('auth/admindashboard');
    })->name('adminaccountmanagement');
    
     Route::get('admin/document',[documentLibraryController::class,'index'])->name('admindocument');
     Route::resource('documents', documentLibraryController::class);
    
    Route::resource('admin', adminController::class);
});

// resident
Route::middleware(['auth', 'verified','role:resident'])->group(function () {
    Route::get('resident-dashboard', [ResidentDashboardController::class, 'index'])->name('residentdashboard');
    
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //greetings route's contoller call
    Route::resource('greetings', UserController::class, )//doesn't work for index,create,store
        ->middleware('throttle:greetings-limit')->missing(function (Request $req) {
            return Inertia::route('greetings.index');//return to the greetings page if some req does not exist
    });

    //parametered route
    Route::get('userz', function () {
        return Inertia::render('user', ['name' => 'Negro de papa']);
    });

    Route::get('todolist',  [TodolistController::class,'index'])->name('todolist');
    Route::post('todolist',  [TodolistController::class,'store'])->name('todolist.store');
    Route::delete('todolist/{id}', [TodolistController::class,'destroy'])->name('todolist.destroy');
    Route::patch('todolist/{id}', [TodolistController::class,'update'])->name('todolist.update'); 
  //todolists router
   
    //fallback for all routes
    Route::fallback(function () {
        return "This is a fall back http!";
    })->middleware('throttle:pagenotfound-limit');

    //get token if it's valid
    Route::get('isvalid',function () {
        return "valid token";
    })->middleware(EnsureTokenIsValid::class);

    Route::get('test', function () {
        return redirect()->away('https://facebook.com');
    });

    // Requested Certificates routes
    Route::resource('requested-certificates', RequestedCertificateController::class);
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';