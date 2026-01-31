<?php

namespace App\Console\Commands;

use App\Services\NotionSyncService;
use App\Services\PublicNotionScraperService;
use Illuminate\Console\Command;

/**
 * Aninag Notion Sync Command
 * Syncs artwork data from Notion to local database
 * Supports both API (with key) and public scraping (without key)
 */
class SyncNotionArtworks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'aninag:sync-notion 
                            {--test : Test Notion connection only}
                            {--public : Use public page scraper instead of API}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync artworks from Notion database to Aninag catalog';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🎨 Aninag Notion Sync');
        $this->newLine();

        // Determine which service to use
        $usePublicScraper = $this->option('public') || empty(env('NOTION_API_TOKEN'));
        
        if ($usePublicScraper) {
            $this->line('Using public page scraper (no API key needed)');
            $service = app(PublicNotionScraperService::class);
        } else {
            $this->line('Using Notion API');
            $service = app(NotionSyncService::class);
        }

        $this->newLine();

        // Test connection mode
        if ($this->option('test')) {
            $this->info('Testing Notion connection...');
            
            if ($service->testConnection()) {
                $this->info('✓ Successfully connected to Notion');
                return self::SUCCESS;
            } else {
                $this->error('✗ Failed to connect to Notion');
                
                if (!$usePublicScraper) {
                    $this->warn('Please check your NOTION_API_TOKEN and NOTION_DATABASE_ID in .env');
                    $this->info('Or use --public flag to scrape from public page');
                } else {
                    $this->warn('Please check your PUBLIC_NOTION_URL in .env');
                }
                
                return self::FAILURE;
            }
        }

        // Sync artworks
        $this->info('Syncing artworks from Notion...');
        $this->newLine();
        
        $bar = $this->output->createProgressBar();
        $bar->start();
        
        $result = $service->syncArtworks();
        
        $bar->finish();
        $this->newLine(2);

        if ($result['success']) {
            $this->info('✓ ' . $result['message']);
            $this->line("  Synced: {$result['synced']}");
            
            if ($result['errors'] > 0) {
                $this->warn("  Errors: {$result['errors']}");
            }
            
            return self::SUCCESS;
        } else {
            $this->error('✗ Sync failed: ' . $result['error']);
            return self::FAILURE;
        }
    }
}
