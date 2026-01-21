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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name');
            $table->string('name');
            $table->string('contact_number');
            $table->string('email');

            // Address
            $table->string('street_address');
            $table->string('unit_number')->nullable();
            $table->string('city');
            $table->string('province');
            $table->string('postcode');
            $table->string('country');

            $table->text('notes')->nullable();

            // Vehicle Info
            $table->string('vehicle_info'); // Year, Make, Model, Trim Level
            $table->string('vin')->nullable();
            $table->string('color_code')->nullable();
            $table->string('engine_size')->nullable();

            $table->timestamps();
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
