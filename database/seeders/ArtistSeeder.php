<?php

namespace Database\Seeders;

use App\Models\Artist;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArtistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = base_path('scrapper/storage/notion-data/artists.json');
        
        if (!file_exists($jsonPath)) {
            $this->command->error('Artists JSON file not found at: ' . $jsonPath);
            return;
        }

        $artists = json_decode(file_get_contents($jsonPath), true);
        
        if (!$artists) {
            $this->command->error('Failed to parse artists JSON file');
            return;
        }

        $this->command->info('Seeding ' . count($artists) . ' artists...');

        foreach ($artists as $artistData) {
            // Format name: capitalize first letter of each word
            $formattedName = $this->formatArtistName($artistData['name']);
            $slug = Str::slug($formattedName);
            
            // Convert profile image URL to full URL
            $profileImageUrl = $this->convertNotionImageUrl($artistData['profile_image_url']);
            
            Artist::updateOrCreate(
                ['notion_id' => $artistData['notion_id']],
                [
                    'name' => $formattedName,
                    'slug' => $slug,
                    'bio' => $artistData['bio'],
                    'contact_info' => $artistData['contact_info'],
                    'profile_image_url' => $profileImageUrl,
                    'mediums' => $artistData['mediums'] ?? [],
                    'styles' => $artistData['styles'] ?? [],
                    'subjects' => $artistData['subjects'] ?? [],
                    'genres' => $artistData['genres'] ?? [],
                    'description' => $artistData['description'],
                    'page_url' => $artistData['page_url'],
                    'artworks_count' => $artistData['artworks_count'] ?? 0,
                ]
            );
        }

        $this->command->info('Artists seeded successfully!');
    }

    /**
     * Format artist name to proper case (capitalize first letter of first and last name)
     */
    private function formatArtistName(string $name): string
    {
        // Split by comma if format is "LASTNAME, Firstname"
        if (str_contains($name, ',')) {
            $parts = array_map('trim', explode(',', $name));
            if (count($parts) === 2) {
                $lastName = ucfirst(strtolower($parts[0]));
                $firstName = ucfirst(strtolower($parts[1]));
                return $lastName . ', ' . $firstName;
            }
        }
        
        // Otherwise, capitalize each word
        return ucwords(strtolower($name));
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

        return $url;
    }
}
