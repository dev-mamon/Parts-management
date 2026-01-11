<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'categories' => 'required|array|max:20',
            'categories.*.name' => 'required|string|max:255',
            'categories.*.status' => 'required|in:active,inactive',
            'categories.*.featured' => 'sometimes|boolean',

            // Validate the sub_categories array
            'categories.*.sub_categories' => 'required|array|min:1',
            // Validate the fields INSIDE the sub_category object
            'categories.*.sub_categories.*.name' => 'required|string|max:255',
            'categories.*.sub_categories.*.status' => 'required|in:active,inactive',
        ];
    }

    public function messages(): array
    {
        return [
            'categories.required' => 'Please add at least one category.',
            'categories.*.name.required' => 'Category name is required.',

            // Targeted messages for sub-categories
            'categories.*.sub_categories.*.name.required' => 'Sub-category name is required.',
            'categories.*.sub_categories.*.status.in' => 'Sub-category status is invalid.',
            'categories.*.sub_categories.min' => 'Each category needs at least one sub-category.',
        ];
    }
}
