<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Aninag leads table.
     */
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artwork_id')->constrained()->onDelete('cascade');
            $table->string('buyer_name');
            $table->string('buyer_email');
            $table->string('buyer_phone')->nullable();
            $table->enum('intent', ['personal', 'gift', 'corporate'])->default('personal');
            $table->text('message')->nullable();
            $table->enum('lead_status', ['new', 'contacted', 'negotiating', 'closed'])->default('new');
            $table->string('source')->default('web')->comment('Source of the inquiry');
            $table->timestamps();
            
            $table->index(['lead_status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
