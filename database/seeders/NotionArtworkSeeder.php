<?php

namespace Database\Seeders;

use App\Models\Artist;
use App\Models\Artwork;
use App\Models\Gallery;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class NotionArtworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $artworksPath = base_path('scrapper/storage/notion-data/artworks');
        
        if (!File::isDirectory($artworksPath)) {
            $this->command->error('Artworks directory not found at: ' . $artworksPath);
            return;
        }

        // Get or create default gallery
        $gallery = Gallery::firstOrCreate(
            ['name' => 'Art Circle Gallery'],
            [
                'location' => 'Philippines',
                'contact_email' => 'info@artcirclegallery.com',
            ]
        );

        $artworkFiles = File::files($artworksPath);
        $totalArtworks = 0;
        $createdArtworks = 0;
        $skippedArtworks = 0;

        $this->command->info('Processing ' . count($artworkFiles) . ' artist artwork files...');

        foreach ($artworkFiles as $file) {
            if ($file->getExtension() !== 'json') {
                continue;
            }

            $data = json_decode(File::get($file), true);
            
            if (!$data || !isset($data['artworks'])) {
                $this->command->warn('Invalid JSON file: ' . $file->getFilename());
                continue;
            }

            $notionArtistId = $data['artist_id'] ?? null;
            
            if (!$notionArtistId) {
                $this->command->warn('No artist_id in file: ' . $file->getFilename());
                continue;
            }

            // Find artist by notion_id
            $artist = Artist::where('notion_id', $notionArtistId)->first();
            
            if (!$artist) {
                $this->command->warn('Artist not found for notion_id: ' . $notionArtistId);
                continue;
            }

            $this->command->info('Processing artworks for: ' . $artist->name);

            foreach ($data['artworks'] as $artworkData) {
                $totalArtworks++;

                // Skip if missing essential data
                if (empty($artworkData['title']) || empty($artworkData['notion_id'])) {
                    $skippedArtworks++;
                    continue;
                }

                // Fix image URLs
                $imageUrl = $this->fixNotionImageUrl($artworkData['image_url'] ?? null);
                $images = isset($artworkData['images']) && is_array($artworkData['images'])
                    ? array_map([$this, 'fixNotionImageUrl'], $artworkData['images'])
                    : [];

                // Parse dimensions
                $dimensions = $artworkData['dimensions'] ?? null;
                $size = $dimensions ?? ($artworkData['size'] ?? null);

                // Parse year
                $year = $artworkData['year'] ?? date('Y');

                // Parse status
                $status = isset($artworkData['status']) && strtolower($artworkData['status']) === 'available' 
                    ? 'available' 
                    : 'available';

                // Generate slug
                $slug = Str::slug($artworkData['title'] . ' ' . $artist->name);
                $originalSlug = $slug;
                $counter = 1;
                while (Artwork::where('slug', $slug)->exists()) {
                    $slug = $originalSlug . '-' . $counter;
                    $counter++;
                }

                try {
                    Artwork::create([
                        'notion_id' => $artworkData['notion_id'],
                        'notion_artist_id' => $notionArtistId,
                        'gallery_id' => $gallery->id,
                        'artist_id' => $artist->id,
                        'artwork_code' => $artworkData['inventory_code'] ?? 'ACG-' . substr($artworkData['notion_id'], 0, 8),
                        'inventory_code' => $artworkData['inventory_code'],
                        'title' => $artworkData['title'],
                        'slug' => $slug,
                        'description' => $artworkData['description'],
                        'medium' => $artworkData['medium'] ?? 'Mixed Media',
                        'size' => $size ?? 'Unknown',
                        'dimensions' => $dimensions,
                        'year' => (string) $year,
                        'price' => $artworkData['price'],
                        'gallery_price' => $artworkData['gallery_price'],
                        'currency' => 'PHP',
                        'status' => $status,
                        'visibility' => 'public',
                        'primary_image_url' => $imageUrl,
                        'images' => $images,
                        'page_url' => $artworkData['page_url'] ?? null,
                    ]);

                    $createdArtworks++;
                } catch (\Exception $e) {
                    $this->command->warn('Failed to create artwork: ' . $artworkData['title'] . ' - ' . $e->getMessage());
                    $skippedArtworks++;
                }
            }
        }

        $this->command->newLine();
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->command->info('📦 Total artworks processed: ' . $totalArtworks);
        $this->command->info('✅ Artworks created: ' . $createdArtworks);
        $this->command->info('⚠️  Artworks skipped: ' . $skippedArtworks);
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
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
