<?php

namespace App\Http\Controllers\User\Support;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Support/Contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'order_id' => 'nullable|string|max:100',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        SupportTicket::create([
            'user_id' => auth()->id(),
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'order_id' => $validated['order_id'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Message sent successfully!');
    }
    public function terms()
    {
        return Inertia::render('User/Support/Terms');
    }

    public function privacy()
    {
        return Inertia::render('User/Support/Privacy');
    }

    public function returnPolicy()
    {
        return Inertia::render('User/Support/ReturnPolicy');
    }
}
