<?php

namespace App\Observers;

use App\Models\Artwork;
use Illuminate\Support\Facades\Cache;

/**
 * Artwork Observer
 * Handles cache invalidation when artworks are modified
 */
class ArtworkObserver
{
    /**
     * Handle the Artwork "created" event.
     */
    public function created(Artwork $artwork): void
    {
        $this->clearCaches($artwork);
    }

    /**
     * Handle the Artwork "updated" event.
     */
    public function updated(Artwork $artwork): void
    {
        $this->clearCaches($artwork);
    }

    /**
     * Handle the Artwork "deleted" event.
     */
    public function deleted(Artwork $artwork): void
    {
        $this->clearCaches($artwork);
    }

    /**
     * Clear relevant caches
     */
    private function clearCaches(Artwork $artwork): void
    {
        // Clear specific artwork cache
        Cache::forget('artwork_' . $artwork->id);
        
        // Clear catalog filter caches
        Cache::forget('catalog_artists');
        Cache::forget('catalog_mediums');
        
        // Clear homepage featured artworks cache
        Cache::forget('home_featured_artworks');
        
        // Clear all catalog page caches (they're based on filter combinations)
        // This is a simple approach - for more complex needs, use cache tags
        $this->clearCatalogCaches();
    }

    /**
     * Clear all catalog-related caches
     */
    private function clearCatalogCaches(): void
    {
        // Pattern-based cache clearing for catalog pages
        // Note: This works with array/database cache drivers
        // For Redis/Memcached, consider using cache tags instead
        try {
            $keys = Cache::get('catalog_cache_keys', []);
            foreach ($keys as $key) {
                Cache::forget($key);
            }
            Cache::forget('catalog_cache_keys');
        } catch (\Exception $e) {
            // If cache clearing fails, log it but don't break the application
            \Log::warning('Failed to clear catalog caches: ' . $e->getMessage());
        }
    }
}
