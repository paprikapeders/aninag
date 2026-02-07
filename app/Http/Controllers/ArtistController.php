<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Artist Controller
 * Handles artist listing and individual artist pages
 */
class ArtistController extends Controller
{
    /**
     * Display listing of all artists
     */
    public function index(): Response
    {
        $artists = Cache::remember('artists_index', 600, function () {
            return Artist::orderBy('name')
                ->get()
                ->map(function ($artist) {
                    return [
                        'id' => $artist->id,
                        'slug' => $artist->slug,
                        'name' => $artist->name,
                        'bio' => $artist->bio ? \Illuminate\Support\Str::limit($artist->bio, 200) : null,
                        'profile_image_url' => $this->fixNotionImageUrl($artist->profile_image_url),
                        'artworks_count' => $artist->artworks_count,
                    ];
                });
        });

        return Inertia::render('Artists/Index', [
            'artists' => $artists,
        ]);
    }

    /**
     * Display individual artist page
     */
    public function show(string $slug): Response
    {
        $artist = Cache::remember("artist_{$slug}", 600, function () use ($slug) {
            return Artist::where('slug', $slug)->firstOrFail();
        });

        $artworks = Cache::remember("artist_{$slug}_artworks", 600, function () use ($artist) {
            return $artist->artworks()
                ->publiclyAvailable()
                ->with('gallery')
                ->latest()
                ->get()
                ->map(function ($artwork) {
                    return [
                        'id' => $artwork->id,
                        'slug' => $artwork->slug,
                        'title' => $artwork->display_title,
                        'medium' => $artwork->medium,
                        'size' => $artwork->size,
                        'year' => $artwork->year,
                        'primary_image_url' => $artwork->primary_image_url,
                        'formatted_price' => $artwork->formatted_price,
                    ];
                });
        });

        return Inertia::render('Artists/Show', [
            'artist' => [
                'id' => $artist->id,
                'name' => $artist->name,
                'slug' => $artist->slug,
                'bio' => $artist->bio,
                'description' => $artist->description,
                'profile_image_url' => $this->fixNotionImageUrl($artist->profile_image_url),
                'contact_info' => $artist->contact_info,
                'mediums' => $artist->mediums,
                'styles' => $artist->styles,
                'subjects' => $artist->subjects,
                'genres' => $artist->genres,
                'artworks_count' => $artist->artworks_count,
            ],
            'artworks' => $artworks,
        ]);
    }

    /**
     * Fix Notion image URLs to use full domain
     */
    private function fixNotionImageUrl(?string $url): ?string
    {
        if (!$url) {
            return null;
        }

        // If URL starts with /image/, prepend Notion domain
        if (str_starts_with($url, '/image/')) {
            return 'https://artcirclegallery.notion.site' . $url;
        }

        return $url;
    }
}
