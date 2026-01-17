import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import {
    CheckCircle,
    ShoppingBag,
    ArrowRight,
    Printer,
    Home
} from "lucide-react";

export default function Success({ auth, order }) {
    return (
        <UserLayout user={auth.user}>
            <Head title="Order Confirmed" />

            <div className="bg-[#F8F9FB] min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">

                    {/* Top Status Header */}
                    <div className="bg-emerald-500 p-8 text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <CheckCircle size={32} className="text-white" />
                        </div>
                        <h1 className="text-xl font-black text-white uppercase tracking-tight">Payment Success!</h1>
                        <p className="text-emerald-50 text-[12px] mt-1 font-medium opacity-90">
                            Your order has been placed successfully.
                        </p>
                    </div>

                    <div className="p-6">
                        {/* Order Summary Box */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6 space-y-3">
                            <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <span>Order Number</span>
                                <span className="text-slate-900">#{order?.order_number}</span>
                            </div>
                            <div className="h-px bg-slate-200/50" />
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium text-[13px]">Total Amount Paid</span>
                                <span className="text-lg font-black text-slate-900">
                                    ${parseFloat(order?.total_amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                            <Link
                                href={route('parts.index')}
                                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-red-600 transition-all text-sm"
                            >
                                <ShoppingBag size={18} />
                                Continue Shopping
                            </Link>

                            <button
                                onClick={() => window.print()}
                                className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all text-[12px]"
                            >
                                <Printer size={16} />
                                Print Receipt
                            </button>
                        </div>

                        <div className="text-center mt-6">
                            <Link
                                href="/"
                                className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-900 flex items-center justify-center gap-1 transition-colors"
                            >
                                <Home size={12} /> Go to Dashboard <ArrowRight size={10} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
