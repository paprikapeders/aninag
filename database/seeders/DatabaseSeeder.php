<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Gallery;
use App\Models\Artist;
use App\Models\Artwork;
use App\Models\ArtworkImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

/**
 * Aninag Database Seeder
 * Seeds data from scraped JSON file for online gallery catalog
 */
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the Aninag application's database from JSON file
     */
    public function run(): void
    {
        // Create Main Gallery
        $gallery = Gallery::create([
            'name' => 'Art Circle Gallery',
            'description' => 'Premier online gallery featuring curated contemporary artworks from talented Filipino and international artists. Discover unique pieces for collectors and art enthusiasts.',
            'location' => 'Metro Manila, Philippines',
            'contact_email' => 'gallery@artcirclegallery.com',
        ]);

        // Load JSON data from scraped file
        $jsonPath = base_path('scrapper/artcirclegallery_dump/artworks.json');
        
        if (!File::exists($jsonPath)) {
            $this->command->error("❌ JSON file not found at: {$jsonPath}");
            return;
        }

        $jsonContent = File::get($jsonPath);
        $data = json_decode($jsonContent, true);

        if (!isset($data['artworks'])) {
            $this->command->error('❌ Invalid JSON structure - missing artworks array');
            return;
        }

        $artworks = $data['artworks'];
        $artistsCache = [];
        $createdArtworks = 0;
        $createdArtists = 0;
        $createdImages = 0;
        $skippedArtworks = 0;

        $this->command->info('📦 Processing ' . count($artworks) . ' artworks from JSON...');

        foreach ($artworks as $artworkData) {
            // Skip artworks without essential data
            if (empty($artworkData['title']) || $artworkData['title'] === 'Description') {
                $skippedArtworks++;
                continue;
            }

            // Get or create artist
            $artistName = $artworkData['artist'] ?? 'Unknown Artist';
            
            if (!isset($artistsCache[$artistName])) {
                $artist = Artist::firstOrCreate(
                    ['name' => $artistName],
                    ['bio' => "Contemporary artist featured in Art Circle Gallery."]
                );
                $artistsCache[$artistName] = $artist;
                
                if ($artist->wasRecentlyCreated) {
                    $createdArtists++;
                }
            } else {
                $artist = $artistsCache[$artistName];
            }

            // Prepare artwork data
            $inventoryCode = $artworkData['inventory_code'] ?? 'N/A';
            $title = $artworkData['title'];
            $medium = $artworkData['medium'] ?? 'Mixed Media';
            $dimensions = $artworkData['dimensions'] ?? 'Dimensions not specified';
            $year = $artworkData['year'] ?? date('Y');
            
            // Handle price - use gallery_price if available
            $price = null;
            if (!empty($artworkData['gallery_price'])) {
                $price = floatval($artworkData['gallery_price']);
            } elseif (!empty($artworkData['price'])) {
                $price = floatval($artworkData['price']);
            }

            // Map status from JSON to database enum
            $status = 'available';
            if (!empty($artworkData['status'])) {
                $statusLower = strtolower($artworkData['status']);
                if (in_array($statusLower, ['available', 'reserved', 'sold'])) {
                    $status = $statusLower;
                }
            }

            // Get primary image URL
            $primaryImageUrl = null;
            if (!empty($artworkData['images']) && isset($artworkData['images'][0]['url'])) {
                $primaryImageUrl = $artworkData['images'][0]['url'];
            }

            // Create artwork
            try {
                $artwork = Artwork::create([
                    'gallery_id' => $gallery->id,
                    'artist_id' => $artist->id,
                    'artwork_code' => $inventoryCode,
                    'title' => $title,
                    'medium' => $medium,
                    'size' => $dimensions,
                    'year' => $year,
                    'price' => $price,
                    'currency' => 'PHP',
                    'status' => $status,
                    'visibility' => 'public',
                    'primary_image_url' => $primaryImageUrl,
                ]);

                $createdArtworks++;

                // Add additional images
                if (!empty($artworkData['images']) && count($artworkData['images']) > 1) {
                    foreach (array_slice($artworkData['images'], 1) as $index => $image) {
                        ArtworkImage::create([
                            'artwork_id' => $artwork->id,
                            'image_url' => $image['url'],
                            'sort_order' => $index + 1,
                        ]);
                        $createdImages++;
                    }
                }

            } catch (\Exception $e) {
                $this->command->warn("⚠️  Skipped artwork '{$title}': " . $e->getMessage());
                $skippedArtworks++;
            }
        }

        // Summary
        $this->command->newLine();
        $this->command->info('✅ Gallery catalog seeded successfully!');
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->command->info("📍 Gallery: {$gallery->name}");
        $this->command->info("👥 Artists: {$createdArtists} created");
        $this->command->info("🖼️  Artworks: {$createdArtworks} created");
        $this->command->info("📸 Additional Images: {$createdImages} created");
        
        if ($skippedArtworks > 0) {
            $this->command->warn("⚠️  Skipped: {$skippedArtworks} artworks (missing essential data)");
        }
        
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
}
