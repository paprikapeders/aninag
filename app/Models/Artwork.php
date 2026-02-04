<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

/**
 * Aninag Artwork Model
 * Core model representing artworks in the catalog
 */
class Artwork extends Model
{
    use HasFactory;

    protected $fillable = [
        'gallery_id',
        'artist_id',
        'artwork_code',
        'title',
        'slug',
        'medium',
        'size',
        'year',
        'price',
        'currency',
        'status',
        'visibility',
        'primary_image_url',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'images' => 'array',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically generate slug on creation
        static::creating(function ($artwork) {
            if (empty($artwork->slug)) {
                $artwork->slug = $artwork->generateUniqueSlug();
            }
        });

        // Update slug when title changes
        static::updating(function ($artwork) {
            if ($artwork->isDirty('title') && empty($artwork->slug)) {
                $artwork->slug = $artwork->generateUniqueSlug();
            }
        });
    }

    /**
     * Generate a unique slug for the artwork
     */
    public function generateUniqueSlug(): string
    {
        $slug = Str::slug($this->title . ' ' . $this->artist->name);
        $originalSlug = $slug;
        $count = 1;

        while (static::where('slug', $slug)->where('id', '!=', $this->id)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Scope to get only public and available artworks
     */
    public function scopePubliclyAvailable(Builder $query): Builder
    {
        return $query->where('visibility', 'public')
                     ->whereIn('status', ['available', 'Available']);
    }

    /**
     * Scope to get featured artworks for homepage
     * Only includes artworks with images
     */
    public function scopeFeatured(Builder $query, int $limit = 6): Builder
    {
        return $query->publiclyAvailable()
                     ->whereNotNull('primary_image_url')
                     ->where('primary_image_url', '!=', '')
                     ->latest()
                     ->limit($limit);
    }

    /**
     * Get the gallery that owns this artwork
     */
    public function gallery(): BelongsTo
    {
        return $this->belongsTo(Gallery::class);
    }

    /**
     * Get the artist of this artwork
     */
    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Get all images for this artwork
     */
    public function images(): HasMany
    {
        return $this->hasMany(ArtworkImage::class)->orderBy('sort_order');
    }

    /**
     * Get leads/inquiries for this artwork
     */
    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }

    /**
     * Get commission record for this artwork
     */
    public function commission(): HasMany
    {
        return $this->hasMany(Commission::class);
    }

    /**
     * Check if artwork is available
     */
    public function isAvailable(): bool
    {
        return $this->status === 'available' && $this->visibility === 'public';
    }

    /**
     * Get formatted price with currency
     */
    public function getFormattedPriceAttribute(): ?string
    {
        if (!$this->price) {
            return null;
        }
        
        // Format with Philippine Peso symbol
        $symbol = $this->currency === 'PHP' ? '₱' : $this->currency . ' ';
        return $symbol . number_format($this->price, 0);
    }

    /**
     * Get proxied primary image URL
     */
    public function getPrimaryImageUrlAttribute($value): ?string
    {
        return proxy_image_url($value);
    }
}
