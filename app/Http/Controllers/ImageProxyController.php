<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ImageProxyController extends Controller
{
    /**
     * Proxy Notion images to avoid CORS and expiration issues
     */
    public function show(Request $request)
    {
        $url = $request->query('url');
        
        if (!$url) {
            abort(400, 'Missing URL parameter');
        }

        // Validate that the URL is from Notion
        if (!Str::contains($url, 'notion.so') && !Str::contains($url, 'amazonaws.com')) {
            abort(403, 'Invalid image source');
        }

        // Create a cache key based on the URL
        $cacheKey = 'image_proxy_' . md5($url);
        
        // Try to get from cache first (24 hours)
        $cachedData = Cache::get($cacheKey);
        
        if ($cachedData) {
            return response($cachedData['content'])
                ->header('Content-Type', $cachedData['content_type'])
                ->header('Cache-Control', 'public, max-age=86400');
        }

        try {
            // Fetch the image
            $response = Http::timeout(30)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept' => 'image/webp,image/apng,image/*,*/*;q=0.8',
                ])
                ->get($url);

            if ($response->failed()) {
                abort(404, 'Image not found');
            }

            $content = $response->body();
            $contentType = $response->header('Content-Type') ?? 'image/jpeg';

            // Cache for 24 hours
            Cache::put($cacheKey, [
                'content' => $content,
                'content_type' => $contentType,
            ], now()->addDay());

            return response($content)
                ->header('Content-Type', $contentType)
                ->header('Cache-Control', 'public, max-age=86400')
                ->header('Access-Control-Allow-Origin', '*');

        } catch (\Exception $e) {
            abort(500, 'Failed to fetch image: ' . $e->getMessage());
        }
    }
}
