<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ProfileSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings/ProfileSettings', [
            'user' => auth()->user(),
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'profile_photo' => 'nullable|image|max:2048', // 2MB Max
        ]);

        if ($request->hasFile('profile_photo')) {
            // Delete old photo if exists
            if ($user->profile_photo) {
                Helper::deleteFile($user->profile_photo);
            }
            
            $upload = Helper::uploadFile('users', $request->file('profile_photo'), true);
            if ($upload) {
                $validated['profile_photo'] = $upload['original'];
            }
        }

        $user->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        auth()->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }
}
