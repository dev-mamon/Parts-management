# Admin Dashboard Optimization & UI Polish

## Performance (Millisecond-level loading)
- [x] Change cache driver back to file
- [x] Remove Redis cache tags from code
- [x] Update cache invalidation logic
- [x] Keep all query optimizations (Index-friendly queries)
- [x] Clear cache and verify performance (200ms initial load)

## UI Redesign (Subtle Premium)
- [x] Redesign Index.jsx (Main Dashboard)
- [x] Refine "Delete" and "Bulk Action" components
- [x] Redesign Product Create Page (Create.jsx)
- [x] Redesign Product Edit Page (Edit.jsx)
- [x] Ensure consistent Indigo theme across all forms
- [x] Refine Fitment & Part Number UX
- [x] Tone down excessive highlights and shadows for a flatter look
- [x] Final visual audit across all admin pages

## Branding Update
- [x] Replace all Indigo primary button colors with Brand Orange (`rgb(255 159 67)`)
    - [x] Update Index.jsx (Add Item, Pagination highlights, etc.)
    - [x] Update Create.jsx (Publish, Category selection, etc.)
    - [x] Update Edit.jsx (Save, Category selection, etc.)
- [x] Ensure focus rings and selection states match the new orange theme

## Smooth Transitions
- [x] Implement smooth loading states for Product Table (Remove layout flicker)
    - [x] Update Index.jsx logic (Loading opacity vs Skeleton swap)
    - [x] Add linear progress bar or subtle overlay

## Mobile Responsiveness
- [x] Optimize Index.jsx for Mobile devices
    - [x] Responsive Header & Filters
    - [x] Fixed table width with horizontal scroll
    - [x] Refined padding and typography for small screens
## UI Polish
- [x] Hide scrollbars while maintaining scroll functionality
    - [x] Update app.css with hidden scrollbar styles for .custom-scrollbar
    - [x] Hide global browser scrollbar (html, body)
## Category Management Optimization
- [x] Backend: Eager load sub-categories in `IndexController`
- [x] Frontend: Apply Brand Orange to `Category/Index.jsx`
- [x] Frontend: Implement smooth transitions in `Category/Index.jsx`
- [x] Frontend: Mobile responsiveness (Table min-width)
- [x] Frontend: Brand consistency in `Create.jsx` and `Edit.jsx`
## Dynamic Email Settings
- [x] Backend: Create `settings` table and `Setting` model
- [x] Backend: Implement `EmailSettingController`
- [x] Backend: Dynamic mail config loading logic
- [x] Frontend: Create `EmailSettings.jsx` page
- [x] Frontend: Add routes for Email Settings

## Dynamic Payment Settings
- [x] Backend: Implement `PaymentSettingController`
- [x] Backend: Dynamic Stripe config loading logic in `AppServiceProvider`
- [x] Frontend: Create `PaymentSettings.jsx` page (Product Layout)
- [x] Frontend: Update sidebar and routes for Payment Settings

## Admin Profile Settings
- [x] Backend: Implement `ProfileSettingController` (Personal Info, Password, Avatar)
- [x] Frontend: Create `ProfileSettings.jsx` page (Product Layout)
- [x] Frontend: Update sidebar and routes for Profile Settings

## Admin Order Management
- [x] Backend: Implement `OrderController` (List, Show, Update Status)
- [x] Frontend: Create `Order/Index.jsx` (Order List with Filters)
- [x] Frontend: Create `Order/Show.jsx` (Order Details & Status Update)
- [x] Frontend: Update Sidebar and Routes for Admin Orders

## Admin Return Management
- [x] Backend: Implement `ReturnRequestController` (List, Show, Update)
- [x] Backend: Create `AdminReturnRequestSnapshot` for performance
- [x] Frontend: Create `ReturnRequest/Index.jsx`
- [x] Frontend: Create `ReturnRequest/Show.jsx`
- [x] Frontend: Update Sidebar and Routes
