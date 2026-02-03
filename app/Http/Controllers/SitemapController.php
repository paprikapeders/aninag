<?php

namespace App\Http\Controllers;

use App\Models\Artwork;
use Illuminate\Http\Response;

/**
 * Aninag Sitemap Controller
 * Generates XML sitemap for SEO
 */
class SitemapController extends Controller
{
    /**
     * Generate sitemap.xml for search engines
     */
    public function index(): Response
    {
        $artworks = Artwork::publiclyAvailable()
            ->latest('updated_at')
            ->get();

        $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
        $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Homepage
        $sitemap .= '<url>';
        $sitemap .= '<loc>' . url('/') . '</loc>';
        $sitemap .= '<changefreq>daily</changefreq>';
        $sitemap .= '<priority>1.0</priority>';
        $sitemap .= '</url>';

        // Catalog page
        $sitemap .= '<url>';
        $sitemap .= '<loc>' . url('/catalog') . '</loc>';
        $sitemap .= '<changefreq>daily</changefreq>';
        $sitemap .= '<priority>0.9</priority>';
        $sitemap .= '</url>';

        // About page
        $sitemap .= '<url>';
        $sitemap .= '<loc>' . url('/about') . '</loc>';
        $sitemap .= '<changefreq>monthly</changefreq>';
        $sitemap .= '<priority>0.7</priority>';
        $sitemap .= '</url>';

        // Artwork pages (using slugs)
        foreach ($artworks as $artwork) {
            $sitemap .= '<url>';
            $sitemap .= '<loc>' . url('/artwork/' . $artwork->slug) . '</loc>';
            $sitemap .= '<lastmod>' . $artwork->updated_at->toAtomString() . '</lastmod>';
            $sitemap .= '<changefreq>weekly</changefreq>';
            $sitemap .= '<priority>0.8</priority>';
            $sitemap .= '</url>';
        }

        $sitemap .= '</urlset>';

        return response($sitemap, 200)
            ->header('Content-Type', 'text/xml');
    }
}
