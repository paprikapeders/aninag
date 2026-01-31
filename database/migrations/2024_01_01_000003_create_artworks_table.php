<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Aninag artworks table.
     */
    public function up(): void
    {
        Schema::create('artworks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_id')->constrained()->onDelete('cascade');
            $table->foreignId('artist_id')->constrained()->onDelete('cascade');
            $table->string('artwork_code')->unique()->comment('Unique code from Notion');
            $table->string('title');
            $table->string('medium');
            $table->string('size');
            $table->string('year');
            $table->decimal('price', 10, 2)->nullable()->comment('Gallery-approved price');
            $table->string('currency', 3)->default('USD');
            $table->enum('status', ['available', 'reserved', 'sold'])->default('available');
            $table->enum('visibility', ['public', 'private'])->default('public');
            $table->string('primary_image_url')->nullable();
            $table->timestamps();
            
            $table->index(['status', 'visibility']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artworks');
    }
};
