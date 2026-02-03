<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('artworks', function (Blueprint $table) {
            if (!Schema::hasColumn('artworks', 'notion_id')) {
                $table->string('notion_id')->unique()->nullable()->after('id');
            }
            if (!Schema::hasColumn('artworks', 'notion_artist_id')) {
                $table->string('notion_artist_id')->nullable()->after('artist_id');
            }
            if (!Schema::hasColumn('artworks', 'description')) {
                $table->text('description')->nullable()->after('title');
            }
            if (!Schema::hasColumn('artworks', 'dimensions')) {
                $table->string('dimensions')->nullable()->after('size');
            }
            if (!Schema::hasColumn('artworks', 'gallery_price')) {
                $table->decimal('gallery_price', 10, 2)->nullable()->after('price');
            }
            if (!Schema::hasColumn('artworks', 'images')) {
                $table->json('images')->nullable()->after('primary_image_url');
            }
            if (!Schema::hasColumn('artworks', 'inventory_code')) {
                $table->string('inventory_code')->nullable()->after('artwork_code');
            }
            if (!Schema::hasColumn('artworks', 'page_url')) {
                $table->string('page_url', 500)->nullable()->after('images');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('artworks', function (Blueprint $table) {
            $table->dropColumn([
                'notion_id',
                'notion_artist_id',
                'description',
                'dimensions',
                'gallery_price',
                'images',
                'inventory_code',
                'page_url',
            ]);
        });
    }
};
