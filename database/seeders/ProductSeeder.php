<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [];

        for ($i = 1; $i <= 2500; $i++) {
            $products[] = [
                'category_id' => rand(1, 5),
                'sub_category_id' => rand(1, 5),

                'description' => 'Sample product description for product '.$i,

                'buy_price' => rand(50, 200),
                'list_price' => rand(250, 500),

                'stock_oakville' => rand(0, 100),
                'stock_mississauga' => rand(0, 100),
                'stock_saskatoon' => rand(0, 100),

                'sku' => 'SKU-'.strtoupper(Str::random(8)),
                'location_id' => 'LOC-'.rand(100, 999),

                'visibility' => ['public', 'private', 'draft'][rand(0, 2)],

                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('products')->insert($products);
    }
}
