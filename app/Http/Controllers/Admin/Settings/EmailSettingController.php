<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailSettingController extends Controller
{
    public function index()
    {
        $settings = Setting::where('group', 'email')->pluck('value', 'key');

        return Inertia::render('Admin/Settings/EmailSettings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'mail_mailer' => 'required|string',
            'mail_host' => 'required|string',
            'mail_port' => 'required|numeric',
            'mail_username' => 'required|string',
            'mail_password' => 'required|string',
            'mail_encryption' => 'nullable|string',
            'mail_from_address' => 'required|email',
            'mail_from_name' => 'required|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key, 'group' => 'email'],
                ['value' => $value]
            );
        }

        return back()->with('success', 'Email settings updated successfully.');
    }
}
