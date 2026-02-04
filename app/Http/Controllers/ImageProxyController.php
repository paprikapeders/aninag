<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
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

        // Validate that the URL is from Notion or AWS
        if (!Str::contains($url, 'notion.so') && !Str::contains($url, 'amazonaws.com') && !Str::contains($url, 'notion.site')) {
            abort(403, 'Invalid image source');
        }

        // Create a filename based on the URL hash
        $filename = md5($url);
        $cachePath = "image-cache/{$filename}";
        
        // Check if image exists in storage cache
        if (Storage::disk('local')->exists($cachePath)) {
            $cachedData = json_decode(Storage::disk('local')->get($cachePath), true);
            
            // Check if cache is still valid (24 hours)
            if (isset($cachedData['expires_at']) && time() < $cachedData['expires_at']) {
                return response(base64_decode($cachedData['content']))
                    ->header('Content-Type', $cachedData['content_type'])
                    ->header('Cache-Control', 'public, max-age=86400')
                    ->header('Access-Control-Allow-Origin', '*');
            }
        }

        try {
            // Fetch the image with increased timeout
            $response = Http::timeout(60)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept' => 'image/webp,image/apng,image/*,*/*;q=0.8',
                    'Accept-Language' => 'en-US,en;q=0.9',
                    'Referer' => 'https://notion.so',
                ])
                ->get($url);

            if ($response->failed()) {
                \Log::error('Image proxy failed', [
                    'url' => $url,
                    'status' => $response->status(),
                ]);
                abort(404, 'Image not found');
            }

            $content = $response->body();
            $contentType = $response->header('Content-Type') ?? 'image/jpeg';

            // Only cache if we got actual image content
            if (!empty($content) && strlen($content) > 100) {
                // Store in file system cache
                Storage::disk('local')->put($cachePath, json_encode([
                    'content' => base64_encode($content),
                    'content_type' => $contentType,
                    'expires_at' => time() + 86400, // 24 hours
                ]));
            }

            return response($content)
                ->header('Content-Type', $contentType)
                ->header('Cache-Control', 'public, max-age=86400')
                ->header('Access-Control-Allow-Origin', '*');

        } catch (\Exception $e) {
            \Log::error('Image proxy exception', [
                'url' => $url,
                'error' => $e->getMessage(),
            ]);
            abort(500, 'Failed to fetch image: ' . $e->getMessage());
        }
    }
}
