import UserLayout from "@/Layouts/UserLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";
import {
    Trash2,
    Plus,
    Minus,
    ArrowUpRight,
    ShoppingBag,
    ImageOff,
    ChevronLeft,
} from "lucide-react";
import ConfirmDelete from "@/Components/ui/ConfirmDelete";

export default function AddToCart() {
    const { auth, cartItems, subtotal, total } = usePage().props;

    const handleUpdateQuantity = (id, currentQty, delta) => {
        const newQuantity = currentQty + delta;
        if (newQuantity >= 1) {
            router.patch(
                route("carts.update", id),
                { quantity: newQuantity },
                {
                    preserveScroll: true,
                    preserveState: true
                }
            );
        }
    };

    return (
        <UserLayout user={auth.user}>
            <Head title="Shopping Cart" />

            {/* Font size reduced to text-sm (14px) for better zoom feel */}
            <div className="bg-[#FBFBFC] min-h-screen pb-10 text-sm">
                <div className="max-w-8xl mx-auto px-4 md:px-8">

                    {/* Header Section - Reduced padding */}
                    <div className="flex items-center gap-3 pt-6 mb-4">
                        <Link
                            href={route('parts.index')}
                            className="p-1.5 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
                        >
                            <ChevronLeft size={18} />
                        </Link>
                        <h1 className="text-xl font-bold text-slate-900">
                            Your Shopping Cart
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* --- LEFT: Item List (8 Columns) --- */}
                        <div className="lg:col-span-8 space-y-3">
                            {cartItems && cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white border border-slate-100 rounded-xl p-3.5 flex flex-col sm:flex-row items-center gap-4 hover:shadow-sm transition-shadow group"
                                    >
                                        {/* Product Image - Scaled down to w-24 */}
                                        <div className="relative w-24 h-24 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100 flex items-center justify-center">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    alt={item.name}
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-slate-300">
                                                    <ImageOff size={24} />
                                                    <span className="text-[9px] mt-1 font-medium">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details - Compact Text */}
                                        <div className="flex-1 w-full">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">
                                                        {item.sku || "PRODUCT-SKU"}
                                                    </span>
                                                    <h3 className="font-bold text-base text-slate-900 leading-tight group-hover:text-red-600 transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-1">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                <ConfirmDelete
                                                    id={item.id}
                                                    routeName="carts.destroy"
                                                />
                                            </div>

                                            <div className="flex justify-between items-center mt-4">
                                                {/* Quantity Selector - Smaller buttons */}
                                                <div className="flex items-center bg-slate-50 rounded-lg p-0.5 border border-slate-100">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-slate-800 text-[13px]">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm rounded-md transition-all"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-400 font-medium">Subtotal</p>
                                                    <div className="text-lg font-bold text-slate-900 leading-none">
                                                        ${(item.buy_price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-2xl p-16 text-center border border-dashed border-slate-200">
                                    <ShoppingBag size={40} className="mx-auto text-slate-200 mb-3" />
                                    <p className="text-slate-500 mb-4 font-medium">Your cart is currently empty.</p>
                                    <Link
                                        href={route("parts.index")}
                                        className="text-red-600 font-bold hover:underline text-sm"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* --- RIGHT: Sticky Summary (4 Columns) --- */}
                        <div className="lg:col-span-4 lg:sticky lg:top-8">
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-5">Order Summary</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-slate-900 font-bold">${parseFloat(subtotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-bold uppercase text-[10px]">Calculated at checkout</span>
                                    </div>
                                    <div className="h-px bg-slate-100 my-2" />
                                    <div className="flex justify-between items-end pt-1">
                                        <span className="text-slate-900 font-bold">Total Amount</span>
                                        <span className="text-2xl font-black text-red-600 leading-none">
                                            ${parseFloat(total || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        disabled={!cartItems || cartItems.length === 0}
                                        className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 active:scale-[0.98] transition-all shadow-lg shadow-red-100 disabled:bg-slate-300 disabled:shadow-none"
                                    >
                                        Proceed to Checkout <ArrowUpRight size={18} />
                                    </button>
                                    <button className="w-full text-slate-500 py-2.5 font-bold hover:text-slate-800 transition-all text-[11px] uppercase tracking-wider">
                                        cancle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
