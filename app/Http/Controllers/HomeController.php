<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Aninag Home Controller
 * Handles the homepage display with featured artworks
 */
class HomeController extends Controller
{
    /**
     * Display the Aninag homepage
     */
    public function index(): Response
    {
        // Cache featured artworks for 1 hour
        $featuredArtworks = Cache::remember('home_featured_artworks', 3600, function () {
            return Artwork::with(['artist', 'gallery'])
                ->publiclyAvailable()
                ->whereNotNull('primary_image_url')
                ->where('primary_image_url', '!=', '')
                ->where('title', '!=', 'Untitled')
                ->whereNotNull('title')
                ->whereNotNull('price')
                ->where('price', '>', 0)
                ->latest()
                ->limit(10)
                ->get()
                ->map(function ($artwork) {
                    return [
                        'id' => $artwork->id,
                        'slug' => $artwork->slug,
                        'title' => $artwork->title,
                        'artist_name' => $artwork->artist->name,
                        'medium' => $artwork->medium,
                        'year' => $artwork->year,
                        'primary_image_url' => $artwork->primary_image_url,
                        'status' => $artwork->status,
                    ];
                });
        });

        return Inertia::render('Home', [
            'featuredArtworks' => $featuredArtworks,
            'meta' => [
                'title' => 'Aninag - Where Light Meets Artistry | Filipino Contemporary Art Gallery',
                'description' => 'Discover curated Filipino contemporary artworks with AR preview technology. Connect with premier galleries and artists. View art in your space before you buy.',
                'keywords' => 'Filipino art, contemporary art Philippines, buy art online, art gallery Manila, Philippine artists, AR art preview, art collection',
                'url' => url('/'),
                'image' => asset('images/og-home.jpg'),
            ],
        ]);
    }
}
