<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Aninag Catalog Controller
 * Handles artwork catalog browsing and filtering
 */
class CatalogController extends Controller
{
    /**
     * Display the artwork catalog with filters
     */
    public function index(Request $request): Response
    {
        // Cache catalog results for 10 minutes
        $artworks = Cache::remember('catalog_all_artworks', 600, function () {
            return Artwork::with(['artist', 'gallery'])
                ->publiclyAvailable()
                ->latest()
                ->get()
                ->map(function ($artwork) {
                    return [
                        'id' => $artwork->id,
                        'slug' => $artwork->slug,
                        'title' => $artwork->title,
                        'artist_name' => $artwork->artist->name,
                        'medium' => $artwork->medium,
                        'size' => $artwork->size,
                        'year' => $artwork->year,
                        'primary_image_url' => $artwork->primary_image_url,
                        'formatted_price' => $artwork->formatted_price,
                        'price' => $artwork->price,
                    ];
                });
        });

        // Get unique artists and mediums for filters (cached)
        $artists = Cache::remember('catalog_artists', 3600, function () {
            return Artist::whereHas('artworks', function ($q) {
                $q->publiclyAvailable();
            })->pluck('name')->unique()->sort()->values();
        });

        $mediums = Cache::remember('catalog_mediums', 3600, function () {
            return Artwork::publiclyAvailable()
                ->distinct()
                ->pluck('medium')
                ->unique()
                ->sort()
                ->values();
        });

        // Define price ranges for filtering (Philippine Peso)
        $priceRanges = [
            ['label' => 'Under ₱250,000', 'min' => 0, 'max' => 250000],
            ['label' => '₱250,000 - ₱500,000', 'min' => 250000, 'max' => 500000],
            ['label' => '₱500,000 - ₱1,000,000', 'min' => 500000, 'max' => 1000000],
            ['label' => '₱1,000,000 - ₱2,500,000', 'min' => 1000000, 'max' => 2500000],
            ['label' => 'Over ₱2,500,000', 'min' => 2500000, 'max' => PHP_INT_MAX],
        ];

        return Inertia::render('Catalog', [
            'artworks' => $artworks,
            'artists' => $artists,
            'mediums' => $mediums,
            'priceRanges' => $priceRanges,
            'meta' => [
                'title' => 'Browse Art Collection - ' . count($artworks) . '+ Contemporary Artworks | Aninag',
                'description' => 'Explore our curated collection of Filipino contemporary art. Filter by artist, medium, and price. Preview artworks in your space with AR technology.',
                'keywords' => 'art catalog, buy Filipino art, contemporary paintings, sculptures, art for sale Philippines',
                'url' => url('/catalog'),
                'image' => asset('images/og-catalog.jpg'),
            ],
        ]);
    }

    /**
     * Display a specific artwork detail page
     */
    public function show(Artwork $artwork): Response
    {
        // Track views in session for social proof
        $viewKey = 'artwork_views_' . $artwork->id;
        $views = session()->get($viewKey, 0);
        session()->put($viewKey, $views + 1);
        
        // Cache artwork details for 30 minutes
        $artworkData = Cache::remember('artwork_' . $artwork->id, 1800, function () use ($artwork) {
            // Load relationships
            $artwork->load(['artist', 'gallery', 'images']);
            
            // Check if artwork is publicly available
            if (!$artwork->isAvailable()) {
                return null;
            }
            
            return [
                'id' => $artwork->id,
                'slug' => $artwork->slug,
                'artwork_code' => $artwork->artwork_code,
                'title' => $artwork->title,
                'artist_id' => $artwork->artist->id,
                'artist_name' => $artwork->artist->name,
                'artist_bio' => $artwork->artist->bio,
                'medium' => $artwork->medium,
                'size' => $artwork->size,
                'year' => $artwork->year,
                'price' => $artwork->price,
                'primary_image_url' => $artwork->primary_image_url,
                'gallery_name' => $artwork->gallery->name,
                'gallery_location' => $artwork->gallery->location,
                'status' => $artwork->status,
                'formatted_price' => $artwork->formatted_price,
                'images' => $artwork->images->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image_url' => $image->image_url,
                    ];
                }),
            ];
        });
        
        if (!$artworkData) {
            abort(404);
        }

        // Track viewed artwork in session for email notifications
        $viewedArtworks = session()->get('viewed_artworks', []);
        
        // Add current artwork if not already tracked (limit to last 10)
        $artworkKey = $artworkData['id'];
        if (!isset($viewedArtworks[$artworkKey])) {
            $viewedArtworks[$artworkKey] = [
                'id' => $artworkData['id'],
                'title' => $artworkData['title'],
                'artist_name' => $artworkData['artist_name'],
                'medium' => $artworkData['medium'],
                'year' => $artworkData['year'],
                'viewed_at' => now()->toDateTimeString(),
            ];
            
            // Keep only last 10 viewed artworks
            if (count($viewedArtworks) > 10) {
                array_shift($viewedArtworks);
            }
            
            session()->put('viewed_artworks', $viewedArtworks);
        }

        // Get similar artworks (same artist or same medium, exclude current)
        $similarArtworks = Cache::remember('similar_artworks_' . $artwork->id, 1800, function () use ($artwork) {
            return Artwork::with(['artist', 'gallery'])
                ->publiclyAvailable()
                ->where('id', '!=', $artwork->id)
                ->where(function ($query) use ($artwork) {
                    $query->where('artist_id', $artwork->artist_id)
                          ->orWhere('medium', $artwork->medium);
                })
                ->latest()
                ->limit(4)
                ->get()
                ->map(function ($similarArtwork) {
                    return [
                        'id' => $similarArtwork->id,
                        'title' => $similarArtwork->title,
                        'artist_name' => $similarArtwork->artist->name,
                        'medium' => $similarArtwork->medium,
                        'size' => $similarArtwork->size,
                        'year' => $similarArtwork->year,
                        'primary_image_url' => $similarArtwork->primary_image_url,
                        'status' => $similarArtwork->status,
                        'formatted_price' => $similarArtwork->formatted_price,
                    ];
                });
        });

        return Inertia::render('ArtworkDetail', [
            'artwork' => $artworkData,
            'similarArtworks' => $similarArtworks,
            'meta' => [
                'title' => $artworkData['title'] . ' by ' . $artworkData['artist_name'] . ' | Aninag',
                'description' => sprintf(
                    '%s by %s - %s, %s. %s. Available at %s. View with AR technology in your space.',
                    $artworkData['title'],
                    $artworkData['artist_name'],
                    $artworkData['medium'],
                    $artworkData['year'],
                    $artworkData['formatted_price'],
                    $artworkData['gallery_name']
                ),
                'keywords' => sprintf(
                    '%s, %s art, %s, Philippine contemporary art, %s',
                    $artworkData['artist_name'],
                    $artworkData['medium'],
                    $artworkData['title'],
                    $artworkData['gallery_name']
                ),
                'url' => url('/artwork/' . $artworkData['slug']),
                'image' => $artworkData['primary_image_url'],
                'type' => 'product',
                'price' => $artworkData['price'],
                'currency' => 'PHP',
                'availability' => $artworkData['status'] === 'available' ? 'in stock' : 'out of stock',
            ],
        ]);
    }
}
