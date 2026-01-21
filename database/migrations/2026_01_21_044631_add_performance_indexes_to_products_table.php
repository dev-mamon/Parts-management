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
        Schema::table('products', function (Blueprint $table) {
            $table->index('visibility', 'idx_products_visibility');
            $table->index('category_id', 'idx_products_category_id');
            $table->index('sub_category_id', 'idx_products_sub_category_id');
            $table->index('sku', 'idx_products_sku');
            $table->index('created_at', 'idx_products_created_at');
            $table->index(['visibility', 'category_id', 'sub_category_id'], 'idx_products_filter_combo');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('idx_products_filter_combo');
            $table->dropIndex('idx_products_visibility');
            $table->dropIndex('idx_products_category_id');
            $table->dropIndex('idx_products_sub_category_id');
            $table->dropIndex('idx_products_sku');
            $table->dropIndex('idx_products_created_at');
        });
    }
};
