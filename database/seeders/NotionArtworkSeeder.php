<?php

namespace Database\Seeders;

use App\Models\Artist;
use App\Models\Artwork;
use App\Models\Gallery;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $artworksDir = base_path('scrapper/storage/notion-data/artworks');
        
        if (!is_dir($artworksDir)) {
            $this->command->error('Artworks directory not found at: ' . $artworksDir);
            return;
        }

        // Get all artwork JSON files
        $artworkFiles = File::files($artworksDir);
        
        if (empty($artworkFiles)) {
            $this->command->error('No artwork files found in directory');
            return;
        }

        // Get the default gallery (assuming first gallery or create one)
        $gallery = Gallery::first();
        if (!$gallery) {
            $this->command->error('No gallery found. Please seed galleries first.');
            return;
        }

        $this->command->info('Processing ' . count($artworkFiles) . ' artwork files...');
        $totalArtworks = 0;

        foreach ($artworkFiles as $file) {
            $artworkData = json_decode(File::get($file->getPathname()), true);
            
            if (!$artworkData || !isset($artworkData['artworks'])) {
                $this->command->warn('Skipping invalid file: ' . $file->getFilename());
                continue;
            }

            // Find the artist by notion_id
            $artist = Artist::where('notion_id', $artworkData['artist_id'])->first();
            
            if (!$artist) {
                $this->command->warn('Artist not found for notion_id: ' . $artworkData['artist_id']);
                continue;
            }

            $this->command->info('Processing artworks for: ' . $artist->name);

            foreach ($artworkData['artworks'] as $artworkItem) {
                // Format the title (capitalize first letter of each word)
                $formattedTitle = $this->formatTitle($artworkItem['title'] ?? 'Untitled');
                
                // Generate slug from title and artist name
                $baseSlug = Str::slug($formattedTitle . ' ' . $artist->name);
                $slug = $this->generateUniqueSlug($baseSlug);

                // Map status
                $status = $this->mapStatus($artworkItem['status'] ?? 'available');

                // Convert Notion image URL to full URL
                $imageUrl = $this->convertNotionImageUrl($artworkItem['image_url'] ?? null);

                // Create or update artwork
                Artwork::updateOrCreate(
                    ['artwork_code' => $artworkItem['notion_id']],
                    [
                        'gallery_id' => $gallery->id,
                        'artist_id' => $artist->id,
                        'title' => $formattedTitle,
                        'slug' => $slug,
                        'medium' => $artworkItem['medium'] ?? 'Unknown',
                        'size' => $artworkItem['dimensions'] ?? 'Unknown',
                        'year' => $artworkItem['year'] ?? 'N/A',
                        'price' => $this->parsePrice($artworkItem['price'] ?? $artworkItem['gallery_price']),
                        'currency' => 'PHP',
                        'status' => $status,
                        'visibility' => 'public',
                        'primary_image_url' => $imageUrl,
                    ]
                );

                $totalArtworks++;
            }
        }

        $this->command->info("Successfully seeded {$totalArtworks} artworks!");
    }

    /**
     * Format title to proper case
     */
    private function formatTitle(string $title): string
    {
        // Capitalize first letter of each word
        return ucwords(strtolower($title));
    }

    /**
     * Generate a unique slug for artwork
     */
    private function generateUniqueSlug(string $baseSlug): string
    {
        $slug = $baseSlug;
        $count = 1;

        while (Artwork::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    /**
     * Map Notion status to database status
     */
    private function mapStatus(?string $status): string
    {
        if (!$status) {
            return 'available';
        }

        $status = strtolower($status);
        
        if (str_contains($status, 'sold')) {
            return 'sold';
        } elseif (str_contains($status, 'reserved')) {
            return 'reserved';
        }
        
        return 'available';
    }

    /**
     * Parse price from string to decimal
     */
    private function parsePrice($price): ?float
    {
        if (!$price) {
            return null;
        }

        // Remove currency symbols and commas
        $cleanPrice = preg_replace('/[^\d.]/', '', $price);
        
        return $cleanPrice ? (float) $cleanPrice : null;
    }

    /**
     * Convert Notion relative image URL to full URL
     */
    private function convertNotionImageUrl(?string $url): ?string
    {
        if (!$url) {
            return null;
        }

        // If URL already starts with http/https, return as-is
        if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
            return $url;
        }

        // If URL starts with /image/, prepend Notion domain
        if (str_starts_with($url, '/image/')) {
            return 'https://artcirclegallery.notion.site' . $url;
        }

        // If URL starts with /attachment:, prepend Notion domain
        if (str_starts_with($url, '/attachment:')) {
            return 'https://artcirclegallery.notion.site/image/' . $url;
        }

        return $url;
    }
}
