<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class ClearArtworkCaches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'artwork:clear-cache {--all : Clear all application caches}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear artwork-related caches for faster catalog loading';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🧹 Clearing artwork caches...');

        if ($this->option('all')) {
            Cache::flush();
            $this->info('✅ All application caches cleared');
            return self::SUCCESS;
        }

        // Clear specific artwork caches
        $cleared = 0;

        // Clear catalog filter caches
        if (Cache::forget('catalog_artists')) {
            $cleared++;
            $this->line('  - Cleared catalog artists cache');
        }
        
        if (Cache::forget('catalog_mediums')) {
            $cleared++;
            $this->line('  - Cleared catalog mediums cache');
        }

        // Clear homepage featured artworks
        if (Cache::forget('home_featured_artworks')) {
            $cleared++;
            $this->line('  - Cleared featured artworks cache');
        }

        // Clear catalog page caches
        $keys = Cache::get('catalog_cache_keys', []);
        if (count($keys) > 0) {
            foreach ($keys as $key) {
                Cache::forget($key);
                $cleared++;
            }
            Cache::forget('catalog_cache_keys');
            $this->line('  - Cleared ' . count($keys) . ' catalog page caches');
        }

        if ($cleared === 0) {
            $this->warn('⚠️  No caches found to clear');
        } else {
            $this->info("✅ Successfully cleared {$cleared} cache entries");
        }

        $this->newLine();
        $this->comment('💡 Tip: Use --all flag to clear all application caches');

        return self::SUCCESS;
    }
}
