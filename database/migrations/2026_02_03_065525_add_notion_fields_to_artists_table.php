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
        Schema::table('artists', function (Blueprint $table) {
            if (!Schema::hasColumn('artists', 'notion_id')) {
                $table->string('notion_id')->unique()->nullable()->after('id');
            }
            if (!Schema::hasColumn('artists', 'slug')) {
                $table->string('slug')->unique()->nullable()->after('name');
            }
            if (!Schema::hasColumn('artists', 'contact_info')) {
                $table->text('contact_info')->nullable()->after('bio');
            }
            if (!Schema::hasColumn('artists', 'profile_image_url')) {
                $table->string('profile_image_url', 500)->nullable()->after('contact_info');
            }
            if (!Schema::hasColumn('artists', 'mediums')) {
                $table->json('mediums')->nullable()->after('profile_image_url');
            }
            if (!Schema::hasColumn('artists', 'styles')) {
                $table->json('styles')->nullable()->after('mediums');
            }
            if (!Schema::hasColumn('artists', 'subjects')) {
                $table->json('subjects')->nullable()->after('styles');
            }
            if (!Schema::hasColumn('artists', 'genres')) {
                $table->json('genres')->nullable()->after('subjects');
            }
            if (!Schema::hasColumn('artists', 'description')) {
                $table->text('description')->nullable()->after('genres');
            }
            if (!Schema::hasColumn('artists', 'page_url')) {
                $table->string('page_url', 500)->nullable()->after('description');
            }
            if (!Schema::hasColumn('artists', 'artworks_count')) {
                $table->integer('artworks_count')->default(0)->after('page_url');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('artists', function (Blueprint $table) {
            $table->dropColumn([
                'notion_id',
                'slug',
                'contact_info',
                'profile_image_url',
                'mediums',
                'styles',
                'subjects',
                'genres',
                'description',
                'page_url',
                'artworks_count',
            ]);
        });
    }
};
