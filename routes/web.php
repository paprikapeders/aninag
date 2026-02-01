<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\AboutController;

/**
 * Aninag Public Routes
 * All routes for buyer-facing pages
 */

// Home page - featured artworks
Route::get('/', [HomeController::class, 'index'])->name('home');

// About page
Route::get('/about', [AboutController::class, 'index'])->name('about');

// Catalog - browse all artworks
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog');

// Artwork detail page
Route::get('/artwork/{artwork}', [CatalogController::class, 'show'])->name('artwork.show');

// Lead submission (buyer inquiry)
Route::post('/inquiry', [LeadController::class, 'store'])->name('inquiry.store');

// Confirmation page
Route::post('/confirmation', [LeadController::class, 'confirmation'])->name('confirmation');

// Inquiry confirmation
Route::get('/inquiry/{lead}/confirmation', [LeadController::class, 'confirmation'])->name('inquiry.confirmation');

// SEO - Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
