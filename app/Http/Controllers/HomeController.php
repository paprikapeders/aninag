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
                ->featured(6)
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
        ]);
    }
}
