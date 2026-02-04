<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Aninag Artwork Image Model
 * Represents additional images for artworks
 */
class ArtworkImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'artwork_id',
        'image_url',
        'sort_order',
    ];

    /**
     * Get the artwork this image belongs to
     */
    public function artwork(): BelongsTo
    {
        return $this->belongsTo(Artwork::class);
    }

    /**
     * Get proxied image URL
     */
    public function getImageUrlAttribute($value): ?string
    {
        return proxy_image_url($value);
    }
}
