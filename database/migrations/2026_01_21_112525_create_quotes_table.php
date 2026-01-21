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
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('quote_number')->unique();
            $table->string('title')->default('My Saved Quote');
            $table->string('status')->default('active'); // active, expired, expiring_soon
            $table->timestamp('valid_until')->nullable();
            $table->decimal('total_amount', 12, 2)->default(0);
            $table->integer('items_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
