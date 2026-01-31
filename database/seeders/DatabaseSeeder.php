<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Gallery;
use App\Models\Artist;
use App\Models\Artwork;
use App\Models\ArtworkImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 * Aninag Database Seeder
 * Seeds demo data for galleries, artists, and artworks
 */
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the Aninag application's database.
     */
    public function run(): void
    {
        // Create Gallery
        $gallery = Gallery::create([
            'name' => 'Artisan Contemporary Gallery',
            'description' => 'A premier gallery showcasing exceptional contemporary art from emerging and established artists.',
            'location' => 'Metro Manila, Philippines',
            'contact_email' => 'info@artisangallery.ph',
        ]);

        // Create Artists
        $artists = [
            [
                'name' => 'Maria Santos',
                'bio' => 'Maria Santos is a contemporary Filipino artist known for her vibrant abstract compositions that explore themes of identity and cultural heritage. Her work has been exhibited internationally and is held in private collections across Asia.',
            ],
            [
                'name' => 'Juan dela Cruz',
                'bio' => 'Juan dela Cruz creates powerful mixed-media works that examine the intersection of tradition and modernity in Philippine society. His artistic practice spans painting, sculpture, and installation.',
            ],
            [
                'name' => 'Sofia Reyes',
                'bio' => 'Sofia Reyes is celebrated for her minimalist approach to contemporary art. Her geometric abstractions have garnered critical acclaim for their subtle use of color and form.',
            ],
            [
                'name' => 'Carlos Mendoza',
                'bio' => 'Carlos Mendoza works primarily in oil on canvas, creating contemplative landscapes that blur the boundaries between representation and abstraction. His works evoke a sense of place and memory.',
            ],
            [
                'name' => 'Ana Villanueva',
                'bio' => 'Ana Villanueva\'s sculptural works explore materiality and space. Working with bronze, wood, and mixed media, she creates pieces that challenge traditional notions of form and structure.',
            ],
            [
                'name' => 'Ricardo Torres',
                'bio' => 'Ricardo Torres is a multimedia artist whose practice encompasses painting, digital art, and photography. His work investigates contemporary urban life and its impact on human connection.',
            ],
        ];

        foreach ($artists as $artistData) {
            Artist::create($artistData);
        }

        // Create Artworks with verified Unsplash images
        $artworks = [
            [
                'artist_id' => 1,
                'artwork_code' => 'MS-2024-001',
                'title' => 'Confluence of Dreams',
                'medium' => 'Oil on Canvas',
                'size' => '120 x 150 cm',
                'year' => '2024',
                'price' => 85000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 1,
                'artwork_code' => 'MS-2023-042',
                'title' => 'Urban Rhythms',
                'medium' => 'Acrylic on Canvas',
                'size' => '100 x 100 cm',
                'year' => '2023',
                'price' => 62000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1536924940095-d2dd2a0e5d60?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 2,
                'artwork_code' => 'JDC-2024-015',
                'title' => 'Heritage Fragments',
                'medium' => 'Mixed Media on Wood',
                'size' => '90 x 120 cm',
                'year' => '2024',
                'price' => 95000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1577720643272-265f5f7a40f2?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 2,
                'artwork_code' => 'JDC-2023-088',
                'title' => 'Ancestral Echoes',
                'medium' => 'Oil and Collage on Canvas',
                'size' => '130 x 100 cm',
                'year' => '2023',
                'price' => 78000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1578926078716-ceb43274e6e1?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 3,
                'artwork_code' => 'SR-2024-007',
                'title' => 'Geometric Meditation No. 3',
                'medium' => 'Acrylic on Linen',
                'size' => '80 x 80 cm',
                'year' => '2024',
                'price' => 55000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 3,
                'artwork_code' => 'SR-2024-012',
                'title' => 'Chromatic Balance',
                'medium' => 'Acrylic on Canvas',
                'size' => '100 x 100 cm',
                'year' => '2024',
                'price' => 68000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 4,
                'artwork_code' => 'CM-2023-034',
                'title' => 'Twilight Memory',
                'medium' => 'Oil on Canvas',
                'size' => '110 x 140 cm',
                'year' => '2023',
                'price' => 92000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 4,
                'artwork_code' => 'CM-2024-008',
                'title' => 'Coastal Impression',
                'medium' => 'Oil on Canvas',
                'size' => '90 x 120 cm',
                'year' => '2024',
                'price' => 72000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 5,
                'artwork_code' => 'AV-2024-003',
                'title' => 'Emergence',
                'medium' => 'Bronze',
                'size' => '45 x 30 x 60 cm',
                'year' => '2024',
                'price' => 125000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1582561833249-7d14b7a0dac1?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 5,
                'artwork_code' => 'AV-2023-021',
                'title' => 'Interconnected',
                'medium' => 'Wood and Metal',
                'size' => '70 x 40 x 50 cm',
                'year' => '2023',
                'price' => 88000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 6,
                'artwork_code' => 'RT-2024-019',
                'title' => 'Digital Solitude',
                'medium' => 'Mixed Media',
                'size' => '100 x 150 cm',
                'year' => '2024',
                'price' => 82000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop',
            ],
            [
                'artist_id' => 6,
                'artwork_code' => 'RT-2023-067',
                'title' => 'Urban Connections',
                'medium' => 'Photography and Paint',
                'size' => '80 x 120 cm',
                'year' => '2023',
                'price' => 58000,
                'primary_image_url' => 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop',
            ],
        ];

        foreach ($artworks as $artworkData) {
            $artworkData['gallery_id'] = $gallery->id;
            $artworkData['currency'] = 'PHP';
            $artworkData['status'] = 'available';
            $artworkData['visibility'] = 'public';

            $artwork = Artwork::create($artworkData);

            // Add additional images for some artworks
            if (in_array($artwork->id, [1, 3, 5, 7, 9])) {
                ArtworkImage::create([
                    'artwork_id' => $artwork->id,
                    'image_url' => 'https://images.unsplash.com/photo-1578926078716-ceb43274e6e1?w=800&auto=format&fit=crop',
                    'sort_order' => 1,
                ]);
                ArtworkImage::create([
                    'artwork_id' => $artwork->id,
                    'image_url' => 'https://images.unsplash.com/photo-1577720643272-265f5f7a40f2?w=800&auto=format&fit=crop',
                    'sort_order' => 2,
                ]);
            }
        }

        $this->command->info('✓ Aninag demo data seeded successfully!');
        $this->command->info('  - 1 Gallery created');
        $this->command->info('  - 6 Artists created');
        $this->command->info('  - 12 Artworks created');
    }
}
