<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Aninag Artist Model
 * Represents artists whose work is featured
 */
class Artist extends Model
{
    use HasFactory;

    protected $fillable = [
        'notion_id',
        'name',
        'slug',
        'bio',
        'contact_info',
        'profile_image_url',
        'mediums',
        'styles',
        'subjects',
        'genres',
        'description',
        'page_url',
        'artworks_count',
    ];

    protected $casts = [
        'mediums' => 'array',
        'styles' => 'array',
        'subjects' => 'array',
        'genres' => 'array',
    ];

    /**
     * Get artworks by this artist
     */
    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }
}
