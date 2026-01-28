import React, { useEffect } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Bookmark, Eye, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart } = usePage().props;
    const cartItems = cart?.items || [];
    const cartSubtotal = cart?.subtotal || 0;

    // Refresh cart items when open
    useEffect(() => {
        if (isOpen) {
            router.reload({ only: ["cart"] });
        }
    }, [isOpen]);

    const handleUpdateQuantity = (id, currentQty, delta) => {
        const newQuantity = currentQty + delta;
        if (newQuantity >= 1) {
            router.patch(
                route("carts.update", id),
                { quantity: newQuantity },
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }
    };

    const handleRemoveItem = (id) => {
        router.delete(route("carts.destroy", id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => toast.success("Item removed from cart")
        });
    };

    const handleCheckout = () => {
        router.post(route("checkout.process"), {
            cartItems: cartItems
        }, {
            onSuccess: () => {
                toast.success("Order processed successfully!");
                onClose();
            },
            onError: () => toast.error("Unable to process checkout")
        });
    };

    const handleSaveQuote = () => {
        router.post(route("quotes.store-from-cart"), {}, {
            onSuccess: () => {
                toast.success("Cart saved as a quote!");
                onClose();
            },
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] z-[101] flex flex-col"
                    >
                        {/* Compact Header */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-gray-100 rounded-full text-slate-400 hover:text-red-600 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
                                Your Shopping Cart
                            </h2>
                        </div>

                        {/* Cart Items List - Small Spacing Design */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar space-y-2">
                            {cartItems && cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-2.5 flex gap-3 hover:border-red-100 transition-all group relative">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1.5 border border-gray-50">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <ShoppingBag className="text-gray-300" size={20} />
                                            )}
                                        </div>

                                        {/* Product Info - Tighter Layout */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-red-600 uppercase tracking-[0.2em]">
                                                        {item.sku}
                                                    </span>
                                                    <h4 className="text-[12px] font-bold text-slate-900 line-clamp-1 mt-0.5">
                                                        {item.name}
                                                    </h4>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Quantity Selector - Compact */}
                                                <div className="flex items-center bg-[#F8F9FA] rounded-full p-0.5 border border-gray-100">
                                                    <button 
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                                        disabled={item.quantity <= 1}
                                                        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-red-600 rounded-full disabled:opacity-30"
                                                    >
                                                        <Minus size={8} />
                                                    </button>
                                                    <span className="w-5 text-center text-[11px] font-black text-slate-800">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                                        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-red-600 rounded-full"
                                                    >
                                                        <Plus size={8} />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-[13px] font-black text-slate-900 leading-none">
                                                        ${(item.buy_price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                                    <ShoppingBag size={32} className="text-slate-200 mb-2" />
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Empty Cart</p>
                                </div>
                            )}

                            {cartItems && cartItems.length > 0 && (
                                <div className="pt-1">
                                    <button
                                        onClick={onClose}
                                        className="group w-full flex items-center justify-center gap-2 py-2.5 border-2 border-red-700 text-red-700 rounded-full font-black hover:bg-red-50 transition-all active:scale-[0.98]"
                                    >
                                        <Plus size={14} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                                        <span className="text-[10px] uppercase tracking-widest">Add Another Item</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Order Summary - Premium Compact */}
                        <div className="px-5 py-5 bg-white border-t border-gray-100 shadow-[0_-15px_40px_-20px_rgba(0,0,0,0.08)]">
                            <h3 className="text-base font-bold text-slate-800 mb-4">Order Summary</h3>
                            
                            <div className="space-y-2.5 mb-5">
                                <div className="flex justify-between text-[12px] font-bold text-slate-400 italic-none">
                                    <span className="uppercase tracking-wider">Subtotal</span>
                                    <span className="text-slate-900 font-black">${parseFloat(cartSubtotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-[12px] font-bold text-slate-400 border-b border-gray-50 pb-2.5">
                                    <span className="uppercase tracking-wider text-[10px]">Shipping</span>
                                    <span className="text-green-600 text-[10px] font-black uppercase tracking-widest">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between items-end pt-1">
                                    <span className="text-sm font-black text-slate-800 tracking-tight">Total Amount</span>
                                    <span className="text-xl font-black text-red-600 leading-none">
                                        ${parseFloat(cartSubtotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <button
                                    onClick={handleCheckout}
                                    disabled={!cartItems?.length}
                                    className="group w-full h-[50px] bg-[#C52020] hover:bg-red-700 text-white rounded-full flex items-center justify-center font-black shadow-lg shadow-red-500/10 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    <span className="mr-3 uppercase tracking-wider text-[12px]">Proceed to Checkout</span>
                                    <div className="bg-white/10 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                                        <ArrowRight size={14} strokeWidth={3} />
                                    </div>
                                </button>

                                <button 
                                    onClick={handleSaveQuote}
                                    disabled={!cartItems?.length}
                                    className="group w-full h-[50px] border-2 border-red-100 text-red-600 rounded-full flex items-center justify-center font-black hover:bg-red-50 transition-all active:scale-[0.98] disabled:opacity-30"
                                >
                                    <span className="mr-2 uppercase tracking-wider text-[12px]">Save Quote</span>
                                    <Bookmark size={15} fill="currentColor" className="opacity-10" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

