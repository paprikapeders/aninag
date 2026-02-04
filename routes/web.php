<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ImageProxyController;

/**
 * Aninag Public Routes
 * All routes for buyer-facing pages
 */

// Home page - featured artworks
Route::get('/', [HomeController::class, 'index'])->name('home');

// About page
Route::get('/about', [AboutController::class, 'index'])->name('about');

// Privacy Policy
Route::get('/privacy', function () {
    return \Inertia\Inertia::render('Privacy');
})->name('privacy');

// Terms of Service
Route::get('/terms', function () {
    return \Inertia\Inertia::render('Terms');
})->name('terms');

// Catalog - browse all artworks
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog');

// Artists - browse all artists
Route::get('/artists', [ArtistController::class, 'index'])->name('artists');

// Artist detail page
Route::get('/artists/{artist:slug}', [ArtistController::class, 'show'])->name('artist.show');

// Artwork detail page
Route::get('/artwork/{artwork}', [CatalogController::class, 'show'])->name('artwork.show');

// Lead submission (buyer inquiry)
Route::post('/inquiry', [LeadController::class, 'store'])->name('inquiry.store');

// Confirmation page (both GET and POST)
Route::match(['get', 'post'], '/confirmation', [LeadController::class, 'confirmation'])->name('confirmation');

// Inquiry confirmation
Route::get('/inquiry/{lead}/confirmation', [LeadController::class, 'confirmation'])->name('inquiry.confirmation');

// SEO - Sitemap
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Image Proxy - to handle Notion CDN images
Route::get('/img-proxy', [ImageProxyController::class, 'show'])->name('image.proxy');
