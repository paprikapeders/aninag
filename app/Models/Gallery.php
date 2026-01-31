<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Aninag Gallery Model
 * Represents partnered art galleries
 */
class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'location',
        'contact_email',
    ];

    /**
     * Get artworks belonging to this gallery
     */
    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }

    /**
     * Get commissions for this gallery
     */
    public function commissions(): HasMany
    {
        return $this->hasMany(Commission::class);
    }
}
