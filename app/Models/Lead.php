<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Aninag Lead Model
 * Represents buyer inquiries for artworks
 */
class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'artwork_id',
        'buyer_name',
        'buyer_email',
        'buyer_phone',
        'intent',
        'message',
        'lead_status',
        'source',
    ];

    /**
     * Get the artwork this lead is for
     */
    public function artwork(): BelongsTo
    {
        return $this->belongsTo(Artwork::class);
    }

    /**
     * Check if lead is new
     */
    public function isNew(): bool
    {
        return $this->lead_status === 'new';
    }
}
