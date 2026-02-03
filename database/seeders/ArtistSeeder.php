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
            $slug = Str::slug($artistData['name']);
            
            Artist::updateOrCreate(
                ['notion_id' => $artistData['notion_id']],
                [
                    'name' => $artistData['name'],
                    'slug' => $slug,
                    'bio' => $artistData['bio'],
                    'contact_info' => $artistData['contact_info'],
                    'profile_image_url' => $artistData['profile_image_url'],
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
}
