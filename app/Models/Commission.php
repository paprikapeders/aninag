<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Aninag Commission Model
 * Tracks commissions earned by Aninag on successful sales
 */
class Commission extends Model
{
    use HasFactory;

    protected $fillable = [
        'artwork_id',
        'gallery_id',
        'sale_price',
        'commission_rate',
        'commission_amount',
        'status',
    ];

    protected $casts = [
        'sale_price' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'commission_amount' => 'decimal:2',
    ];

    /**
     * Get the artwork this commission is for
     */
    public function artwork(): BelongsTo
    {
        return $this->belongsTo(Artwork::class);
    }

    /**
     * Get the gallery this commission is from
     */
    public function gallery(): BelongsTo
    {
        return $this->belongsTo(Gallery::class);
    }

    /**
     * Calculate commission amount based on sale price and rate
     */
    public static function calculateCommission(float $salePrice, float $rate): float
    {
        return ($salePrice * $rate) / 100;
    }
}
