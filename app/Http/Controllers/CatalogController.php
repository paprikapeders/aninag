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
        $page = (int) $request->get('page', 1);
        $perPage = 20;
        $artistFilter = $request->get('artist');
        $mediumFilter = $request->get('medium');
        $priceFilter = $request->get('price');
        $sortBy = $request->get('sort', 'newest');
        $searchQuery = $request->get('search');
        
        // Build query with filters
        $query = Artwork::with(['artist', 'gallery'])
            ->where('status', 'available')
            ->where('visibility', 'public')
            ->whereNotNull('price')
            ->where('price', '>', 0);
        
        // Apply search filter
        if ($searchQuery) {
            $query->where(function($q) use ($searchQuery) {
                $q->where('title', 'LIKE', '%' . $searchQuery . '%')
                  ->orWhereHas('artist', function($artistQuery) use ($searchQuery) {
                      $artistQuery->where('name', 'LIKE', '%' . $searchQuery . '%');
                  });
            });
        }
        
        // Apply filters
        if ($artistFilter && $artistFilter !== 'all') {
            $query->whereHas('artist', function($q) use ($artistFilter) {
                $q->where('name', $artistFilter);
            });
        }
        
        if ($mediumFilter && $mediumFilter !== 'all') {
            $query->where('medium', $mediumFilter);
        }
        
        if ($priceFilter && $priceFilter !== 'all') {
            $priceRanges = [
                'Under ₱250,000' => ['min' => 0, 'max' => 250000],
                '₱250,000 - ₱500,000' => ['min' => 250000, 'max' => 500000],
                '₱500,000 - ₱1,000,000' => ['min' => 500000, 'max' => 1000000],
                '₱1,000,000 - ₱2,500,000' => ['min' => 1000000, 'max' => 2500000],
                'Over ₱2,500,000' => ['min' => 2500000, 'max' => PHP_INT_MAX],
            ];
            
            if (isset($priceRanges[$priceFilter])) {
                $range = $priceRanges[$priceFilter];
                $query->whereBetween('price', [$range['min'], $range['max']]);
            }
        }
        
        // Apply sorting
        switch ($sortBy) {
            case 'price-low':
                $query->orderBy('price', 'asc');
                break;
            case 'price-high':
                $query->orderBy('price', 'desc');
                break;
            case 'title-az':
                $query->orderBy('title', 'asc');
                break;
            case 'artist-az':
                $query->join('artists', 'artworks.artist_id', '=', 'artists.id')
                     ->orderBy('artists.name', 'asc')
                     ->select('artworks.*');
                break;
            case 'newest':
            default:
                $query->latest();
                break;
        }
        
        // Get total count for pagination
        $totalCount = $query->count();
        
        // Get paginated results
        $artworks = $query->skip(($page - 1) * $perPage)
            ->take($perPage)
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
                    'status' => $artwork->status,
                ];
            })
            ->values()
            ->toArray();

        // Get unique artists and mediums for filters (cached)
        $artists = Cache::remember('catalog_artists', 3600, function () {
            return Artist::whereHas('artworks', function ($q) {
                $q->where('status', 'available')
                  ->where('visibility', 'public')
                  ->whereNotNull('price')
                  ->where('price', '>', 0);
            })->pluck('name')->unique()->sort()->values();
        });

        $mediums = Cache::remember('catalog_mediums', 3600, function () {
            return Artwork::where('status', 'available')
                ->where('visibility', 'public')
                ->whereNotNull('price')
                ->where('price', '>', 0)
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
            'filters' => [
                'artist' => $artistFilter ?? 'all',
                'medium' => $mediumFilter ?? 'all',
                'price' => $priceFilter ?? 'all',
                'sort' => $sortBy,
                'search' => $searchQuery ?? '',
            ],
            'pagination' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $totalCount,
                'last_page' => ceil($totalCount / $perPage),
            ],
            'meta' => [
                'title' => 'Browse Art Collection - ' . $totalCount . '+ Contemporary Artworks | Aninag',
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
            // Handle images - could be JSON array or relationship
            $images = [];
            if (is_string($artwork->images)) {
                // JSON string from database
                $imagesArray = json_decode($artwork->images, true) ?: [];
                $images = array_map(function($url, $index) {
                    return [
                        'id' => $index + 1,
                        'image_url' => $url,
                    ];
                }, $imagesArray, array_keys($imagesArray));
            } elseif (is_array($artwork->images)) {
                // Already decoded array
                $images = array_map(function($url, $index) {
                    return [
                        'id' => $index + 1,
                        'image_url' => $url,
                    ];
                }, $artwork->images, array_keys($artwork->images));
            }

            return [
                'id' => $artwork->id,
                'slug' => $artwork->slug,
                'artwork_code' => $artwork->artwork_code,
                'title' => $artwork->title,
                'artist_id' => $artwork->artist->id,
                'artist_name' => $artwork->artist->name,
                'artist_slug' => $artwork->artist->slug,
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
                'images' => $images,
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
                        'slug' => $similarArtwork->slug,
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
