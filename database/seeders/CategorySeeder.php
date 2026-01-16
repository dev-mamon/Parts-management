<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $defaultImage = 'img/Dashboard/56b144518c1fddbb5095d6b2844d7c5de67f040d.png';

        $categories = [
            ['name' => 'Body Panel', 'subcategories' => ['OEM Used', 'Aftermarket', 'OEM Take-Off']],
            ['name' => 'Lamps', 'subcategories' => ['Headlights', 'Tail Lights', 'Fog Lights']],
            ['name' => 'Mechanical', 'subcategories' => ['Engine', 'Transmission', 'Brakes']],
            ['name' => 'Interior', 'subcategories' => ['Seats', 'Dashboard', 'Carpet']],
            ['name' => 'Accessories', 'subcategories' => ['Steering Wheels', 'Floor Mats', 'Covers']],
            ['name' => 'Upgrades', 'subcategories' => ['Performance', 'Suspension', 'Wheels']],
            ['name' => 'Fluids / Paint / Oil', 'subcategories' => ['Oil', 'Brake Fluid', 'Paint']],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::create([
                'name' => $categoryData['name'],
                'slug' => Str::slug($categoryData['name']),
                'image' => $defaultImage,
                'status' => 'active',
            ]);

            foreach ($categoryData['subcategories'] as $subCategoryName) {
                $category->subCategories()->create([
                    'name' => $subCategoryName,
                    'status' => 'active',
                ]);
            }
        }
    }
}
