<?php

namespace App\Helpers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class Helper
{
    /**
     * Delete a file from public/uploads
     */
    public static function uploadFile($folder, $file): string
    {
        $path = public_path("uploads/$folder");
        File::ensureDirectoryExists($path);

        $name = time().'_'.Str::random(8).'.'.$file->getClientOriginalExtension();

        File::move($file->getRealPath(), "$path/$name");

        return "uploads/$folder/$name";
    }

    public static function deleteFile(?string $filePath): bool
    {
        if (! $filePath) {
            return false; // nothing to delete
        }

        $fullPath = public_path($filePath);

        // Only unlink if it's a file
        if (file_exists($fullPath) && is_file($fullPath)) {
            return unlink($fullPath);
        }

        return false;
    }

    /**
     * Generate a public URL for the uploaded file
     */
    public static function generateURL(?string $filePath): ?string
    {
        // Check if the path is empty or only whitespace
        if (empty($filePath) || trim($filePath) === '') {
            return null;
        }
        $fullPath = public_path($filePath);

        // Only return URL if file actually exists
        if (file_exists($fullPath)) {
            return asset($filePath);
        }

        return null;
    }
}
