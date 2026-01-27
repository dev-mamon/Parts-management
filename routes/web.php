<?php

use App\Http\Controllers\Admin\Announcement\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\Blog\IndexController as BlogController;
use App\Http\Controllers\Admin\Category\IndexController as CategoryController;
use App\Http\Controllers\Admin\Lead\LeadController;
use App\Http\Controllers\Admin\Order\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\Product\IndexController as ProductController;
use App\Http\Controllers\Admin\ReturnRequest\ReturnRequestController as AdminReturnRequestController;
use App\Http\Controllers\Admin\Settings\EmailSettingController;
use App\Http\Controllers\Admin\Settings\PaymentSettingController;
use App\Http\Controllers\Admin\Settings\ProfileSettingController;
use App\Http\Controllers\Admin\Support\SupportController as AdminSupportController;
// use App\Http\Controllers\API\User\Blog\IndexController as UserBlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\User\Booking\PaymentController;
use App\Http\Controllers\User\Cart\IndexController as CartController;
use App\Http\Controllers\User\Favourite\IndexController as FavouriteController;
use App\Http\Controllers\User\Order\ActiveOrderController;
use App\Http\Controllers\User\Order\HistoryController;
use App\Http\Controllers\User\Order\ReturnOrderController;
use App\Http\Controllers\User\Parts\IndexController as PartController;
use App\Http\Controllers\User\ProfileController as UserProfileController;
use App\Http\Controllers\User\Quote\QuoteController;
use App\Http\Controllers\User\Support\SupportController as UserSupportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file contains all the routes for the application.
|
| 1. Public routes: Login page and welcome pages accessible without authentication.
| 2. Authenticated user routes: Dashboard, profile management.
| 3. Parts routes: List, add to cart.
| 4. Favourite routes: Toggle and list favourite parts.
| 5. Cart routes: User cart management.
| 6. Checkout & payment routes: Checkout, success, and cancel URLs.
| 7. Admin backend routes: Categories, products, blogs with bulk actions.
| 8. Fallback route: 404 page for unmatched URLs.
| 9. Auth routes: login, register, password reset, etc.
|
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::post('parts/cart', [PartController::class, 'addToCart'])->name('parts.to-cart');
    Route::resource('parts', PartController::class);

    Route::post('favourite/parts', [FavouriteController::class, 'toggle'])->name('parts.favourite');
    Route::resource('favourites', FavouriteController::class);

    Route::post('quotes/toggle', [QuoteController::class, 'toggle'])->name('quotes.toggle');
    Route::post('quotes/from-cart', [QuoteController::class, 'storeFromCart'])->name('quotes.store-from-cart');
    Route::post('quotes/{quote}/convert', [QuoteController::class, 'convertToOrder'])->name('quotes.convert');
    Route::resource('quotes', QuoteController::class);

    Route::resource('carts', CartController::class);

    Route::post('/checkout', [PaymentController::class, 'checkout'])->name('checkout.process');
    Route::get('/payment/success/{order_number}', [PaymentController::class, 'success'])->name('payment.success');
    Route::get('/payment/cancel', [PaymentController::class, 'cancel'])->name('payment.cancel');

    Route::delete('categories/bulk-destroy', [CategoryController::class, 'bulkDestroy'])->name('categories.bulk-destroy');
    Route::resource('categories', CategoryController::class);

    Route::delete('products/bulk-destroy', [ProductController::class, 'bulkDestroy'])->name('products.bulk-destroy');
    Route::get('products/export', [ProductController::class, 'export'])->name('products.export');
    Route::delete('products/file/{file}', [ProductController::class, 'destroyFile'])->name('products.file-destroy');
    Route::resource('products', ProductController::class);

    Route::resource('admin/blogs', BlogController::class);

    // Admin Orders
    Route::get('/admin/orders', [AdminOrderController::class, 'index'])->name('admin.orders.index');
    Route::get('/admin/orders/{order}', [AdminOrderController::class, 'show'])->name('admin.orders.show');
    Route::patch('/admin/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('admin.orders.update-status');

    // Admin Return Management
    Route::get('/admin/returns', [AdminReturnRequestController::class, 'index'])->name('admin.returns.index');
    Route::get('/admin/returns/{returnRequest}', [AdminReturnRequestController::class, 'show'])->name('admin.returns.show');
    Route::patch('/admin/returns/{returnRequest}/status', [AdminReturnRequestController::class, 'updateStatus'])->name('admin.returns.update-status');

    // Admin Lead Management
    Route::delete('/admin/leads/bulk-destroy', [LeadController::class, 'bulkDestroy'])->name('admin.leads.bulk-destroy');
    Route::get('/admin/leads', [LeadController::class, 'index'])->name('admin.leads.index');
    Route::get('/admin/leads/create', [LeadController::class, 'create'])->name('admin.leads.create');
    Route::post('/admin/leads', [LeadController::class, 'store'])->name('admin.leads.store');
    Route::get('/admin/leads/{lead}', [LeadController::class, 'show'])->name('admin.leads.show');
    Route::get('/admin/leads/{lead}/edit', [LeadController::class, 'edit'])->name('admin.leads.edit');
    Route::get('/admin/leads/{lead}/invoice', [LeadController::class, 'invoice'])->name('admin.leads.invoice');
    Route::put('/admin/leads/{lead}', [LeadController::class, 'update'])->name('admin.leads.update');

    // Settings
    Route::get('/email-settings', [EmailSettingController::class, 'index'])->name('admin.settings.email');
    Route::post('/email-settings', [EmailSettingController::class, 'update'])->name('admin.settings.email.update');

    Route::get('/payment-settings', [PaymentSettingController::class, 'index'])->name('admin.settings.payment');
    Route::post('/payment-settings', [PaymentSettingController::class, 'update'])->name('admin.settings.payment.update');

    Route::get('/profile-settings', [ProfileSettingController::class, 'index'])->name('admin.settings.profile');
    Route::post('/profile-settings', [ProfileSettingController::class, 'update'])->name('admin.settings.profile.update');
    Route::post('/profile-settings/password', [ProfileSettingController::class, 'updatePassword'])->name('admin.settings.profile.password');

    // User Return Management (Moved up and renamed to avoid conflict with /orders/{order})
    Route::get('/orders/my-returns', [ReturnOrderController::class, 'returnOrder'])->name('user.returns.index');
    Route::post('/orders/my-returns/store', [ReturnOrderController::class, 'returnRequest'])->name('user.returns.store');

    // history
    Route::get('/orders/active', [ActiveOrderController::class, 'index'])->name('orders.active');
    // Order History
    Route::get('/orders/history', [HistoryController::class, 'index'])->name('orders.history');

    // Order Details (Wildcard must come after static routes)
    Route::get('/orders/{order}', [ActiveOrderController::class, 'show'])->name('orders.show');

    // reorder details
    Route::post('/orders/{order}/reorder', [HistoryController::class, 'reOrder'])
        ->name('orders.reorder');

    // Admin Support Management
    Route::get('/admin/support', [AdminSupportController::class, 'index'])->name('admin.support.index');
    Route::patch('/admin/support/{ticket}/status', [AdminSupportController::class, 'updateStatus'])->name('admin.support.status.update');
    Route::delete('/admin/support/bulk-destroy', [AdminSupportController::class, 'bulkDestroy'])->name('admin.support.bulk-destroy');
    Route::delete('/admin/support/{ticket}', [AdminSupportController::class, 'destroy'])->name('admin.support.destroy');

    // Admin Announcement Management
    Route::get('/admin/announcements', [AdminAnnouncementController::class, 'index'])->name('admin.announcements.index');
    Route::post('/admin/announcements', [AdminAnnouncementController::class, 'store'])->name('admin.announcements.store');
    Route::patch('/admin/announcements/{announcement}/status', [AdminAnnouncementController::class, 'updateStatus'])->name('admin.announcements.update-status');
    Route::delete('/admin/announcements/{announcement}', [AdminAnnouncementController::class, 'destroy'])->name('admin.announcements.destroy');

    // User Support
    Route::get('/contact', [UserSupportController::class, 'index'])->name('contact.index');
    Route::post('/contact', [UserSupportController::class, 'store'])->name('contact.store');
    Route::get('/terms', [UserSupportController::class, 'terms'])->name('terms.index');
    Route::get('/privacy', [UserSupportController::class, 'privacy'])->name('privacy.index');
    Route::get('/return-policy', [UserSupportController::class, 'returnPolicy'])->name('return-policy.index');

    // User Profile Settings
    Route::get('/settings', [UserProfileController::class, 'index'])->name('settings.index');
    Route::post('/settings/account', [UserProfileController::class, 'updateAccount'])->name('settings.account.update');
    Route::post('/settings/company', [UserProfileController::class, 'updateCompany'])->name('settings.company.update');
    Route::post('/settings/password', [UserProfileController::class, 'updatePassword'])->name('settings.password.update');
    Route::post('/settings/preferences', [UserProfileController::class, 'updatePreferences'])->name('settings.preferences.update');
    Route::post('/settings/photo', [UserProfileController::class, 'updatePhoto'])->name('settings.photo.update');

    // blog
    // Route::get('/blogs', [UserBlogController::class, 'index'])->name('blogs.index');
    // Route::get('/blogs/{id}', [UserBlogController::class, 'show'])->name('blogs.show');
});

Route::fallback(function () {
    return Inertia::render('Errors/404');
});

require __DIR__.'/auth.php';
