<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Body Panel',
                'subcategories' => ['OEM Used', 'Aftermarket', 'OEM Take-Off'],
            ],
            [
                'name' => 'Lamps',
                'subcategories' => ['Headlights', 'Tail Lights', 'Fog Lights'],
            ],
            [
                'name' => 'Mechanical',
                'subcategories' => ['Engine', 'Transmission', 'Brakes'],
            ],
            [
                'name' => 'Interior',
                'subcategories' => ['Seats', 'Dashboard', 'Carpet'],
            ],
            [
                'name' => 'Accessories',
                'subcategories' => ['Steering Wheels', 'Floor Mats', 'Covers'],
            ],
            [
                'name' => 'Upgrades',
                'subcategories' => ['Performance', 'Suspension', 'Wheels'],
            ],
            [
                'name' => 'Fluids / Paint / Oil',
                'subcategories' => ['Oil', 'Brake Fluid', 'Paint'],
            ],
        ];

        foreach ($categories as $catData) {
            $category = Category::create([
                'name' => $catData['name'],
                'slug' => Str::slug($catData['name']),
                'status' => 'active',
            ]);

            // create subcategories
            foreach ($catData['subcategories'] as $subName) {
                $category->subCategories()->create([
                    'name' => $subName,
                    'status' => 'active',
                ]);
            }
        }
    }
}
