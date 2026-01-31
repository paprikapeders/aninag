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
        'name',
        'bio',
    ];

    /**
     * Get artworks by this artist
     */
    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }
}
