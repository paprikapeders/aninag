<?php

namespace App\Services;

use App\Models\Gallery;
use App\Models\Artist;
use App\Models\Artwork;
use App\Models\ArtworkImage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Aninag Notion Sync Service
 * Handles syncing artwork data from Notion database to local database
 * 
 * Mock implementation for MVP - shows structure for real Notion API integration
 */
class NotionSyncService
{
    private string $notionToken;
    private string $databaseId;
    private string $apiVersion = '2022-06-28';

    public function __construct()
    {
        $this->notionToken = env('NOTION_API_TOKEN', '');
        $this->databaseId = env('NOTION_DATABASE_ID', '');
    }

    /**
     * Sync all artworks from Notion
     * This is a mock implementation showing the structure
     */
    public function syncArtworks(): array
    {
        try {
            // In production, this would call the real Notion API
            // $artworks = $this->fetchFromNotion();
            
            // For MVP, we'll use mock data structure
            $artworks = $this->getMockNotionData();
            
            $synced = 0;
            $errors = 0;

            foreach ($artworks as $notionArtwork) {
                try {
                    $this->syncSingleArtwork($notionArtwork);
                    $synced++;
                } catch (\Exception $e) {
                    Log::error('Aninag Notion Sync Error: ' . $e->getMessage());
                    $errors++;
                }
            }

            return [
                'success' => true,
                'synced' => $synced,
                'errors' => $errors,
                'message' => "Synced {$synced} artworks from Notion",
            ];

        } catch (\Exception $e) {
            Log::error('Aninag Notion Sync Failed: ' . $e->getMessage());
            
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Fetch artworks from Notion API
     * Real implementation would use Notion SDK
     */
    private function fetchFromNotion(): array
    {
        if (empty($this->notionToken) || empty($this->databaseId)) {
            throw new \Exception('Notion credentials not configured');
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->notionToken,
            'Notion-Version' => $this->apiVersion,
        ])->post("https://api.notion.com/v1/databases/{$this->databaseId}/query", [
            'filter' => [
                'and' => [
                    [
                        'property' => 'visibility',
                        'select' => ['equals' => 'public'],
                    ],
                    [
                        'property' => 'status',
                        'select' => ['equals' => 'available'],
                    ],
                ],
            ],
        ]);

        if (!$response->successful()) {
            throw new \Exception('Failed to fetch from Notion: ' . $response->body());
        }

        return $response->json()['results'] ?? [];
    }

    /**
     * Sync a single artwork from Notion data
     */
    private function syncSingleArtwork(array $notionData): void
    {
        // Extract data from Notion format
        $artworkCode = $notionData['artwork_code'];
        $galleryName = $notionData['gallery'];
        $artistName = $notionData['artist'];

        // Find or create gallery
        $gallery = Gallery::firstOrCreate(
            ['name' => $galleryName],
            [
                'description' => $notionData['gallery_description'] ?? '',
                'location' => $notionData['gallery_location'] ?? '',
                'contact_email' => $notionData['gallery_email'] ?? 'info@gallery.com',
            ]
        );

        // Find or create artist
        $artist = Artist::firstOrCreate(
            ['name' => $artistName],
            [
                'bio' => $notionData['artist_bio'] ?? '',
            ]
        );

        // Create or update artwork
        $artwork = Artwork::updateOrCreate(
            ['artwork_code' => $artworkCode],
            [
                'gallery_id' => $gallery->id,
                'artist_id' => $artist->id,
                'title' => $notionData['title'],
                'medium' => $notionData['medium'],
                'size' => $notionData['size'],
                'year' => $notionData['year'],
                'price' => $notionData['price'] ?? null,
                'currency' => $notionData['currency'] ?? 'USD',
                'status' => $notionData['status'],
                'visibility' => $notionData['visibility'],
                'primary_image_url' => $notionData['primary_image'] ?? null,
            ]
        );

        // Sync additional images
        if (!empty($notionData['images'])) {
            // Remove old images
            $artwork->images()->delete();

            // Add new images
            foreach ($notionData['images'] as $index => $imageUrl) {
                ArtworkImage::create([
                    'artwork_id' => $artwork->id,
                    'image_url' => $imageUrl,
                    'sort_order' => $index,
                ]);
            }
        }
    }

    /**
     * Mock Notion data for demonstration
     * This shows the expected structure from Notion
     */
    private function getMockNotionData(): array
    {
        return [
            [
                'artwork_code' => 'NOTION-2024-001',
                'title' => 'Digital Harmony',
                'artist' => 'Elena Cruz',
                'artist_bio' => 'Elena Cruz is a digital artist exploring the intersection of technology and nature.',
                'gallery' => 'Artisan Contemporary Gallery',
                'gallery_description' => 'Premier contemporary art gallery',
                'gallery_location' => 'Metro Manila',
                'gallery_email' => 'info@artisangallery.ph',
                'medium' => 'Digital Print on Canvas',
                'size' => '100 x 120 cm',
                'year' => '2024',
                'price' => 65000,
                'currency' => 'PHP',
                'status' => 'available',
                'visibility' => 'public',
                'primary_image' => 'https://images.unsplash.com/photo-1578926375605-eaf7559b0a4f?w=800',
                'images' => [
                    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
                ],
            ],
        ];
    }

    /**
     * Test Notion connection
     */
    public function testConnection(): bool
    {
        try {
            if (empty($this->notionToken) || empty($this->databaseId)) {
                Log::warning('Aninag Notion: Credentials not configured');
                return false;
            }

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->notionToken,
                'Notion-Version' => $this->apiVersion,
            ])->get("https://api.notion.com/v1/databases/{$this->databaseId}");

            return $response->successful();

        } catch (\Exception $e) {
            Log::error('Aninag Notion Connection Test Failed: ' . $e->getMessage());
            return false;
        }
    }
}
