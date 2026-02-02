<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Artwork;
use Illuminate\Support\Str;

class GenerateArtworkSlugs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'artworks:generate-slugs {--force : Force regenerate all slugs}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate SEO-friendly slugs for all artworks';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating slugs for artworks...');

        $query = Artwork::with('artist');
        
        if (!$this->option('force')) {
            $query->whereNull('slug');
        }

        $artworks = $query->get();
        
        if ($artworks->isEmpty()) {
            $this->info('No artworks found that need slugs.');
            return Command::SUCCESS;
        }

        $bar = $this->output->createProgressBar($artworks->count());
        $bar->start();

        $generated = 0;
        $skipped = 0;

        foreach ($artworks as $artwork) {
            try {
                if (empty($artwork->slug) || $this->option('force')) {
                    $slug = Str::slug($artwork->title . ' ' . $artwork->artist->name);
                    $originalSlug = $slug;
                    $count = 1;

                    // Ensure uniqueness
                    while (Artwork::where('slug', $slug)
                                  ->where('id', '!=', $artwork->id)
                                  ->exists()) {
                        $slug = $originalSlug . '-' . $count;
                        $count++;
                    }

                    $artwork->slug = $slug;
                    $artwork->save();
                    $generated++;
                } else {
                    $skipped++;
                }
            } catch (\Exception $e) {
                $this->error("\nError generating slug for artwork ID {$artwork->id}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        
        $this->info("✓ Generated {$generated} slugs");
        if ($skipped > 0) {
            $this->info("⊘ Skipped {$skipped} artworks (already have slugs)");
        }
        
        $this->info('Done!');

        return Command::SUCCESS;
    }
}
