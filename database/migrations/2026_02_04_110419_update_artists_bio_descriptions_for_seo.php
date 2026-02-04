<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Artist;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Read the artists data from JSON file
        $jsonPath = base_path('scrapper/storage/notion-data/artists.json');
        
        if (!file_exists($jsonPath)) {
            echo "Artists JSON file not found at: {$jsonPath}\n";
            return;
        }
        
        $artistsData = json_decode(file_get_contents($jsonPath), true);
        
        if (!$artistsData) {
            echo "Failed to parse artists JSON file\n";
            return;
        }
        
        $updatedCount = 0;
        $skippedCount = 0;
        
        foreach ($artistsData as $artistData) {
            $notionId = $artistData['notion_id'] ?? null;
            $bio = $artistData['bio'] ?? null;
            $description = $artistData['description'] ?? null;
            
            if (!$notionId) {
                $skippedCount++;
                continue;
            }
            
            // Find artist by notion_id
            $artist = Artist::where('notion_id', $notionId)->first();
            
            if (!$artist) {
                echo "Artist not found for notion_id: {$notionId}\n";
                $skippedCount++;
                continue;
            }
            
            // Update bio and description if they exist in JSON
            $updated = false;
            
            if ($bio !== null && $bio !== $artist->bio) {
                $artist->bio = $bio;
                $updated = true;
            }
            
            if ($description !== null && $description !== $artist->description) {
                $artist->description = $description;
                $updated = true;
            }
            
            if ($updated) {
                $artist->save();
                $updatedCount++;
                echo "Updated: {$artist->name}\n";
            } else {
                $skippedCount++;
            }
        }
        
        echo "Migration completed!\n";
        echo "Updated: {$updatedCount} artists\n";
        echo "Skipped: {$skippedCount} artists\n";
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This migration cannot be reversed as we don't store the old values
        echo "This migration cannot be reversed. Original bio/description values are not stored.\n";
    }
};
