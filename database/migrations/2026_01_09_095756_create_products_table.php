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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sub_category_id')->constrained('sub_categories')->cascadeOnDelete();

            $table->text('description');

            // Pricing
            $table->decimal('buy_price', 10, 2);
            $table->decimal('list_price', 10, 2);

            // Stock Level (Warehouse based)
            $table->integer('stock_oakville')->default(0);
            $table->integer('stock_mississauga')->default(0);
            $table->integer('stock_saskatoon')->default(0);

            // Identifiers
            $table->string('sku')->unique();
            $table->string('location_id')->nullable();

            // Settings
            $table->enum('visibility', ['private', 'public', 'draft'])->default('public');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
