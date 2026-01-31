<?php

namespace App\Services;

use App\Models\Gallery;
use App\Models\Artist;
use App\Models\Artwork;
use App\Models\ArtworkImage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Aninag Public Notion Scraper Service
 * Scrapes data from public Notion pages without API key
 * Temporary solution until API integration is ready
 */
class PublicNotionScraperService
{
    private string $notionPageUrl;
    private string $galleryName = 'Art Circle Gallery';

    public function __construct()
    {
        // Public Notion database URL
        $this->notionPageUrl = env(
            'PUBLIC_NOTION_URL',
            'https://artcirclegallery.notion.site/0283aa18e06a487881b41b649adfc231?v=df8a0c6ebbb84fd89336f4f0b4bcf723'
        );
    }

    /**
     * Scrape and sync artworks from public Notion page
     */
    public function syncArtworks(): array
    {
        try {
            Log::info('Aninag: Starting public Notion scrape', ['url' => $this->notionPageUrl]);

            // Extract page ID from URL
            $pageId = $this->extractPageId($this->notionPageUrl);
            
            if (!$pageId) {
                throw new \Exception('Invalid Notion page URL');
            }

            Log::info('Aninag: Extracted page ID', ['pageId' => $pageId]);

            // Fetch the public page data
            $artworksData = $this->fetchPublicNotionData($pageId);

            Log::info('Aninag: Fetched artworks', ['count' => count($artworksData)]);

            if (empty($artworksData)) {
                Log::warning('Aninag: No artworks found in Notion page');
                return [
                    'success' => true,
                    'synced' => 0,
                    'errors' => 0,
                    'message' => 'No artworks found in Notion page',
                ];
            }

            // Find or create the gallery
            $gallery = Gallery::firstOrCreate(
                ['name' => $this->galleryName],
                [
                    'description' => 'Art Circle Gallery - Contemporary art from talented artists',
                    'location' => 'Philippines',
                    'contact_email' => 'info@artcirclegallery.com',
                ]
            );

            $synced = 0;
            $errors = 0;

            foreach ($artworksData as $artworkData) {
                try {
                    $this->syncSingleArtwork($artworkData, $gallery);
                    $synced++;
                } catch (\Exception $e) {
                    Log::error('Aninag: Error syncing artwork', [
                        'error' => $e->getMessage(),
                        'data' => $artworkData,
                    ]);
                    $errors++;
                }
            }

            return [
                'success' => true,
                'synced' => $synced,
                'errors' => $errors,
                'message' => "Successfully synced {$synced} artworks from Notion",
            ];

        } catch (\Exception $e) {
            Log::error('Aninag: Public Notion sync failed', ['error' => $e->getMessage()]);
            
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Extract Notion page ID from URL
     */
    private function extractPageId(string $url): ?string
    {
        // Extract the page ID from URLs like:
        // https://artcirclegallery.notion.site/0283aa18e06a487881b41b649adfc231
        preg_match('/([a-f0-9]{32})/', $url, $matches);
        return $matches[1] ?? null;
    }

    /**
     * Fetch data from public Notion page
     * Uses Notion's public API endpoint that doesn't require authentication
     */
    private function fetchPublicNotionData(string $pageId): array
    {
        try {
            Log::info('Aninag: Attempting to fetch from Notion API', ['pageId' => $pageId]);
            
            // Try Method 1: Notion's loadPageChunk API
            $response = Http::timeout(30)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Content-Type' => 'application/json',
                ])
                ->post('https://www.notion.so/api/v3/loadPageChunk', [
                    'pageId' => $pageId,
                    'limit' => 100,
                    'cursor' => ['stack' => []],
                    'chunkNumber' => 0,
                    'verticalColumns' => false,
                ]);

            if (!$response->successful()) {
                Log::warning('Aninag: API method failed, trying alternative', [
                    'status' => $response->status(),
                    'body' => substr($response->body(), 0, 500)
                ]);
                
                // Try Method 2: queryCollection API for database views
                return $this->fetchViaQueryCollection($pageId);
            }

            $data = $response->json();
            Log::info('Aninag: Got API response', [
                'has_recordMap' => isset($data['recordMap']),
                'block_count' => count($data['recordMap']['block'] ?? [])
            ]);
            
            $artworks = $this->parseNotionResponse($data);
            
            if (empty($artworks)) {
                Log::warning('Aninag: No artworks parsed from API, trying HTML scrape');
                return $this->fetchViaHtmlScrape();
            }
            
            return $artworks;

        } catch (\Exception $e) {
            Log::error('Aninag: Error fetching Notion data', ['error' => $e->getMessage()]);
            
            // Fallback to HTML scraping
            return $this->fetchViaHtmlScrape();
        }
    }

    /**
     * Alternative method: Fetch via queryCollection API (for database views)
     */
    private function fetchViaQueryCollection(string $pageId): array
    {
        try {
            Log::info('Aninag: Trying queryCollection method');
            
            // Extract collection view ID from the URL if present
            $viewId = null;
            if (preg_match('/v=([a-f0-9]+)/', $this->notionPageUrl, $matches)) {
                $viewId = $matches[1];
            }
            
            $response = Http::timeout(30)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Content-Type' => 'application/json',
                ])
                ->post('https://www.notion.so/api/v3/queryCollection', [
                    'collectionId' => $pageId,
                    'collectionViewId' => $viewId ?? $pageId,
                    'loader' => [
                        'type' => 'table',
                        'limit' => 100,
                        'userTimeZone' => 'Asia/Manila',
                    ],
                ]);

            if ($response->successful()) {
                $data = $response->json();
                Log::info('Aninag: QueryCollection response', [
                    'has_result' => isset($data['result']),
                    'block_count' => count($data['recordMap']['block'] ?? [])
                ]);
                
                return $this->parseQueryCollectionResponse($data);
            }
            
            return [];
            
        } catch (\Exception $e) {
            Log::error('Aninag: QueryCollection failed', ['error' => $e->getMessage()]);
            return [];
        }
    }

    /**
     * Parse queryCollection API response
     */
    private function parseQueryCollectionResponse(array $response): array
    {
        $artworks = [];
        
        try {
            $recordMap = $response['recordMap'] ?? [];
            $blocks = $recordMap['block'] ?? [];
            $collections = $recordMap['collection'] ?? [];
            
            // Get the collection schema
            $schema = [];
            foreach ($collections as $collection) {
                if (isset($collection['value']['schema'])) {
                    $schema = $collection['value']['schema'];
                    break;
                }
            }
            
            Log::info('Aninag: Found schema properties', ['properties' => array_keys($schema)]);
            
            // Parse blocks that are pages (table rows)
            foreach ($blocks as $blockId => $block) {
                $value = $block['value'] ?? [];
                
                if (($value['type'] ?? '') === 'page') {
                    $artwork = $this->extractArtworkFromBlock($value, $schema);
                    if ($artwork) {
                        $artworks[] = $artwork;
                        Log::info('Aninag: Extracted artwork', ['title' => $artwork['title']]);
                    }
                }
            }
            
        } catch (\Exception $e) {
            Log::error('Aninag: Error parsing queryCollection response', ['error' => $e->getMessage()]);
        }
        
        return $artworks;
    }

    /**
     * Fallback method: Scrape HTML page directly
     */
    private function fetchViaHtmlScrape(): array
    {
        try {
            Log::info('Aninag: Attempting HTML scrape fallback');
            
            $response = Http::timeout(30)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                ])
                ->get($this->notionPageUrl);

            if (!$response->successful()) {
                Log::error('Aninag: HTML scrape failed', ['status' => $response->status()]);
                return [];
            }

            $html = $response->body();
            
            // Look for the embedded data in the page
            // Notion embeds data in script tags with __NEXT_DATA__
            if (preg_match('/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s', $html, $matches)) {
                $jsonData = json_decode($matches[1], true);
                
                if ($jsonData) {
                    Log::info('Aninag: Found embedded data in HTML');
                    
                    // Navigate to the recordMap
                    $recordMap = $jsonData['props']['pageProps']['recordMap'] ?? [];
                    
                    if (!empty($recordMap)) {
                        return $this->parseNotionResponse(['recordMap' => $recordMap]);
                    }
                }
            }
            
            Log::warning('Aninag: Could not extract data from HTML');
            return [];
            
        } catch (\Exception $e) {
            Log::error('Aninag: HTML scrape error', ['error' => $e->getMessage()]);
            return [];
        }
    }

    /**
     * Parse Notion API response and extract artwork data
     */
    private function parseNotionResponse(array $response): array
    {
        $artworks = [];

        try {
            $recordMap = $response['recordMap'] ?? [];
            $blocks = $recordMap['block'] ?? [];

            foreach ($blocks as $blockId => $block) {
                $value = $block['value'] ?? [];
                $type = $value['type'] ?? '';

                // Look for collection_view or page blocks that contain our data
                if ($type === 'collection_view_page' || $type === 'collection_view') {
                    $collectionId = $value['collection_id'] ?? null;
                    
                    if ($collectionId && isset($recordMap['collection'][$collectionId])) {
                        $collection = $recordMap['collection'][$collectionId];
                        $schema = $collection['value']['schema'] ?? [];
                        
                        // Get all collection items
                        foreach ($blocks as $itemId => $itemBlock) {
                            $itemValue = $itemBlock['value'] ?? [];
                            
                            if (($itemValue['type'] ?? '') === 'page' && 
                                ($itemValue['parent_id'] ?? '') === $collectionId) {
                                
                                $artwork = $this->extractArtworkFromBlock($itemValue, $schema);
                                if ($artwork) {
                                    $artworks[] = $artwork;
                                }
                            }
                        }
                    }
                }
            }

        } catch (\Exception $e) {
            Log::error('Aninag: Error parsing Notion response', ['error' => $e->getMessage()]);
        }

        return $artworks;
    }

    /**
     * Extract artwork data from Notion block
     */
    private function extractArtworkFromBlock(array $block, array $schema): ?array
    {
        try {
            $properties = $block['properties'] ?? [];
            $title = $this->getPropertyValue($properties, 'title', $schema);

            if (empty($title)) {
                return null;
            }

            // Extract common artwork properties
            $artwork = [
                'title' => $title,
                'artist' => $this->getPropertyValue($properties, 'Artist', $schema) ?? 'Unknown Artist',
                'medium' => $this->getPropertyValue($properties, 'Medium', $schema) ?? 'Mixed Media',
                'size' => $this->getPropertyValue($properties, 'Size', $schema) ?? 'Dimensions not specified',
                'year' => $this->getPropertyValue($properties, 'Year', $schema) ?? date('Y'),
                'price' => $this->extractPrice($properties, $schema),
                'status' => $this->getPropertyValue($properties, 'Status', $schema) ?? 'available',
                'artwork_code' => $block['id'] ?? Str::random(12),
                'image_url' => $this->extractImageUrl($block),
            ];

            return $artwork;

        } catch (\Exception $e) {
            Log::error('Aninag: Error extracting artwork', ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Get property value from Notion block properties
     */
    private function getPropertyValue(array $properties, string $propertyName, array $schema): ?string
    {
        // Find the property ID for this property name
        $propertyId = null;
        foreach ($schema as $id => $schemaItem) {
            if (($schemaItem['name'] ?? '') === $propertyName) {
                $propertyId = $id;
                break;
            }
        }

        if (!$propertyId || !isset($properties[$propertyId])) {
            return null;
        }

        $property = $properties[$propertyId];

        // Handle different property types
        if (is_array($property) && isset($property[0])) {
            if (is_array($property[0])) {
                return $property[0][0] ?? null;
            }
            return $property[0];
        }

        return null;
    }

    /**
     * Extract price from properties
     */
    private function extractPrice(array $properties, array $schema): ?float
    {
        $priceStr = $this->getPropertyValue($properties, 'Price', $schema);
        
        if (!$priceStr) {
            return null;
        }

        // Remove currency symbols and commas
        $priceStr = preg_replace('/[^0-9.]/', '', $priceStr);
        
        return $priceStr ? (float) $priceStr : null;
    }

    /**
     * Extract image URL from block
     */
    private function extractImageUrl(array $block): ?string
    {
        // Check for cover image
        if (isset($block['format']['page_cover'])) {
            $cover = $block['format']['page_cover'];
            if (Str::startsWith($cover, 'http')) {
                return $cover;
            }
            return 'https://www.notion.so/image/' . urlencode($cover);
        }

        // Check for inline images in properties
        $properties = $block['properties'] ?? [];
        foreach ($properties as $property) {
            if (is_array($property)) {
                foreach ($property as $item) {
                    if (is_array($item) && isset($item[1]) && is_array($item[1])) {
                        foreach ($item[1] as $subItem) {
                            if (is_array($subItem) && ($subItem[0] ?? '') === 'a') {
                                $url = $subItem[1] ?? '';
                                if (Str::startsWith($url, 'http') && 
                                    (Str::contains($url, 'image') || Str::contains($url, '.jpg') || Str::contains($url, '.png'))) {
                                    return $url;
                                }
                            }
                        }
                    }
                }
            }
        }

        return null;
    }

    /**
     * Sync a single artwork to database
     */
    private function syncSingleArtwork(array $artworkData, Gallery $gallery): void
    {
        // Find or create artist
        $artist = Artist::firstOrCreate(
            ['name' => $artworkData['artist']],
            ['bio' => '']
        );

        // Normalize status
        $status = strtolower($artworkData['status'] ?? 'available');
        if (!in_array($status, ['available', 'reserved', 'sold'])) {
            $status = 'available';
        }

        // Create or update artwork
        $artwork = Artwork::updateOrCreate(
            ['artwork_code' => $artworkData['artwork_code']],
            [
                'gallery_id' => $gallery->id,
                'artist_id' => $artist->id,
                'title' => $artworkData['title'],
                'medium' => $artworkData['medium'],
                'size' => $artworkData['size'],
                'year' => $artworkData['year'],
                'price' => $artworkData['price'],
                'currency' => 'PHP',
                'status' => $status,
                'visibility' => 'public',
                'primary_image_url' => $artworkData['image_url'],
            ]
        );

        Log::info('Aninag: Synced artwork', [
            'title' => $artwork->title,
            'artist' => $artist->name,
        ]);
    }

    /**
     * Test if we can access the public Notion page
     */
    public function testConnection(): bool
    {
        try {
            $pageId = $this->extractPageId($this->notionPageUrl);
            
            if (!$pageId) {
                return false;
            }

            $response = Http::timeout(10)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                ])
                ->get($this->notionPageUrl);

            return $response->successful();

        } catch (\Exception $e) {
            Log::error('Aninag: Connection test failed', ['error' => $e->getMessage()]);
            return false;
        }
    }
}
