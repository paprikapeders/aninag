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
                ->where('primary_image_url', 'not like', '%placeholder%')
                ->where('primary_image_url', 'not like', '%no-image%')
                ->where('primary_image_url', 'not like', '%default%')
                ->whereNotNull('title')
                ->whereNotNull('price')
                ->where('price', '>', 0)
                ->latest()
                ->limit(10)
                ->get()
                ->filter(function ($artwork) {
                    // Additional filter to ensure image URL is valid and not just whitespace
                    $imageUrl = trim($artwork->getRawOriginal('primary_image_url'));
                    return !empty($imageUrl) && strlen($imageUrl) > 10;
                })
                ->map(function ($artwork) {
                    return [
                        'id' => $artwork->id,
                        'slug' => $artwork->slug,
                        'title' => $artwork->display_title,
                        'artist_name' => $artwork->artist->name,
                        'medium' => $artwork->medium,
                        'year' => $artwork->year,
                        'primary_image_url' => $artwork->primary_image_url,
                        'status' => $artwork->status,
                    ];
                })
                ->values();
        });

        return Inertia::render('Home', [
            'featuredArtworks' => $featuredArtworks,
            'meta' => [
                'title' => 'Aninag - Gallery Art, Previewed at Home | Filipino Contemporary Art Gallery',
                'description' => 'Discover curated Filipino contemporary artworks with AR preview technology. Connect with premier galleries and artists. View art in your space before you buy.',
                'keywords' => 'Filipino art, contemporary art Philippines, buy art online, art gallery Manila, Philippine artists, AR art preview, art collection',
                'url' => url('/'),
                'image' => asset('images/og-home.jpg'),
            ],
        ]);
    }
}
