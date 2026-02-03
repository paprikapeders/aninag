<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Gallery;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 * Aninag Database Seeder
 * Seeds data from Notion-scraped JSON files for online gallery catalog
 */
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the Aninag application's database from Notion JSON files
     */
    public function run(): void
    {
        $this->command->info('🎨 Starting Aninag Gallery Database Seeding...');
        $this->command->newLine();

        // Create Main Gallery
        $this->command->info('📍 Creating gallery...');
        $gallery = Gallery::firstOrCreate(
            ['name' => 'Art Circle Gallery'],
            [
                'description' => 'Premier online gallery featuring curated contemporary artworks from talented Filipino and international artists. Discover unique pieces for collectors and art enthusiasts.',
                'location' => 'Metro Manila, Philippines',
                'contact_email' => 'gallery@artcirclegallery.com',
            ]
        );
        $this->command->info("✅ Gallery created: {$gallery->name}");
        $this->command->newLine();

        // Seed artists from Notion data
        $this->command->info('👥 Seeding artists from Notion data...');
        $this->call(ArtistSeeder::class);
        $this->command->newLine();

        // Seed artworks from Notion data
        $this->command->info('🖼️  Seeding artworks from Notion data...');
        $this->call(NotionArtworkSeeder::class);
        $this->command->newLine();

        // Summary
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->command->info('✅ Database seeding completed successfully!');
        $this->command->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
}
