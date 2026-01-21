<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentSettingController extends Controller
{
    public function index()
    {
        $settings = Setting::where('group', 'payment')->pluck('value', 'key');

        return Inertia::render('Admin/Settings/PaymentSettings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'stripe_publishable_key' => 'required|string',
            'stripe_secret_key' => 'required|string',
            'stripe_webhook_secret' => 'required|string',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key, 'group' => 'payment'],
                ['value' => $value]
            );
        }

        return back()->with('success', 'Payment settings updated successfully.');
    }
}
