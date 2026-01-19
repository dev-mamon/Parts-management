<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {

        $categories = ['Brakes', 'Engine', 'Suspension', 'Electrical', 'Body'];
        foreach ($categories as $cat) {
            DB::table('categories')->updateOrInsert(
                ['name' => $cat],
                [
                    'slug' => Str::slug($cat),
                    'image' => 'categories/default.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        $carData = [
            'Toyota' => ['Corolla', 'Camry', 'RAV4'],
            'Honda' => ['Civic', 'Accord', 'CR-V'],
            'Ford' => ['F-150', 'Mustang', 'Explorer'],
            'Nissan' => ['Altima', 'Sentra', 'Rogue'],
        ];

        for ($i = 1; $i <= 20; $i++) {
            $make = array_rand($carData);
            $model = $carData[$make][array_rand($carData[$make])];

            $productId = DB::table('products')->insertGetId([
                'category_id' => rand(1, 5),
                'sub_category_id' => rand(1, 5),
                'description' => "High quality $make $model spare part #$i",
                'buy_price' => rand(50, 200),
                'list_price' => rand(250, 500),
                'stock_oakville' => rand(0, 100),
                'stock_mississauga' => rand(0, 100),
                'stock_saskatoon' => rand(0, 100),
                'sku' => strtoupper(Str::random(8)),
                'location_id' => 'LOC-'.rand(100, 999),
                'visibility' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('fitments')->insert([
                'product_id' => $productId,
                'year_from' => rand(2010, 2018),
                'year_to' => rand(2019, 2024),
                'make' => $make,
                'model' => $model,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('parts_numbers')->insert([
                'product_id' => $productId,
                'part_number' => 'PN-'.rand(10000, 99999),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
