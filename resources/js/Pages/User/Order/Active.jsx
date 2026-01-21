import React, { useState, useEffect } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { Skeleton } from "@/Components/ui/Skeleton";
import {
    Search,
    FileText,
    Package,
    Truck,
    ArrowUpRight,
    Calendar,
    Box,
    Clock,
    Tag,
    Receipt,
} from "lucide-react";

// --- Advanced Skeleton Component ---
const OrderCardSkeleton = ({ order }) => {
    const itemCount = order?.items?.length || 2;

    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-8 mb-10">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-50">
                <div className="flex gap-5 items-center">
                    <Skeleton className="w-14 h-14 rounded-2xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                </div>
                <Skeleton className="h-10 w-36 rounded-full" />
            </div>
            
            {/* Key Info Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <Skeleton className="h-24 w-full rounded-3xl" />
                <Skeleton className="h-24 w-full rounded-3xl" />
                <Skeleton className="h-24 w-full rounded-3xl lg:col-span-1 sm:col-span-2" />
            </div>

            {/* Item List Skeleton */}
            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-1 w-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                </div>
                {Array.from({ length: itemCount }).map((_, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-5 border border-slate-100 rounded-3xl">
                        <div className="flex items-center gap-5 w-full sm:w-auto">
                            <Skeleton className="w-20 h-20 rounded-2xl flex-shrink-0" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-3 w-48" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 space-y-2 text-right w-full sm:w-auto">
                            <Skeleton className="h-3 w-16 ml-auto" />
                            <Skeleton className="h-6 w-24 ml-auto" />
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Footer Skeleton */}
            <div className="flex justify-end pt-4">
                <Skeleton className="h-12 w-48 rounded-full" />
            </div>
        </div>
    );
};

export default function Active() {
    const { auth, orders } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const orderList = Array.isArray(orders) ? orders : [];

    useEffect(() => {
        // যদি ডাটা না থাকে, তবে সরাসরি লোডিং বন্ধ করে দেব যাতে স্কেলিটন না দেখায়
        if (orderList.length === 0) {
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => setIsLoading(false), 1200);
            return () => clearTimeout(timer);
        }
    }, [orderList.length]);

    // Filter by search query
    const filteredOrders = orderList.filter((order) =>
        order.order_number.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const getStatusStyles = (status) => {
        switch (status) {
            case "pending":
                return {
                    bg: "bg-amber-50 text-amber-600 border-amber-100",
                    icon: <Clock size={14} />,
                    label: "Pending Verification",
                };
            case "processing":
                return {
                    bg: "bg-blue-50 text-blue-600 border-blue-100",
                    icon: <Package size={14} />,
                    label: "In Processing",
                };
            case "picked_up":
                return {
                    bg: "bg-indigo-50 text-indigo-600 border-indigo-100",
                    icon: <Truck size={14} />,
                    label: "Ready for Pickup",
                };
            default:
                return {
                    bg: "bg-slate-50 text-slate-600 border-slate-100",
                    icon: <FileText size={14} />,
                    label: status,
                };
        }
    };

    return (
        <UserLayout user={auth.user}>
            <Head title="Active Orders" />
            <div className="p-4 md:p-8 bg-[#F8F9FB] min-h-screen">
                <div className="max-w-8xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                Active Orders
                                <span className="inline-flex ml-3 px-2.5 py-1 bg-orange-50 text-[#FF9F43] text-[10px] font-black uppercase rounded-lg border border-orange-100 animate-pulse">
                                    Live Tracking
                                </span>
                            </h1>
                            <p className="text-slate-500 text-sm mt-1 font-medium">
                                Track and manage your current orders in real-time.
                            </p>
                        </div>

                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-orange-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by Order ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-[320px] pl-11 pr-4 py-3 rounded-2xl border-none shadow-sm shadow-slate-200/50 text-sm focus:ring-2 focus:ring-[#FF9F43] outline-none transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    {/* Content Logic */}
                    {isLoading ? (
                        <div className="space-y-10">
                            {orderList.slice(0, 2).map((order, i) => (
                                <OrderCardSkeleton key={i} order={order} />
                            ))}
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Box className="w-8 h-8 text-slate-300" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900">
                                No active orders found
                            </h2>
                            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
                                You don't have any active orders at the moment.
                            </p>
                            <Link
                                href={route("parts.index")}
                                className="mt-8 px-8 py-3 bg-[#FF9F43] text-white rounded-full font-bold text-sm hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95 inline-block"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {filteredOrders.map((order) => {
                                const statusInfo = getStatusStyles(order.status);
                                return (
                                    <div
                                        key={order.id}
                                        className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                                    >
                                        {/* Order Header */}
                                        <div className="p-6 md:p-8 flex flex-wrap justify-between items-center gap-6 border-b border-slate-50">
                                            <div className="flex gap-5 items-center">
                                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF9F43] border border-orange-100">
                                                    <Receipt className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                            Order Reference
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-black text-slate-900 leading-none">
                                                        {order.order_number}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className={`px-5 py-2.5 rounded-full text-[11px] font-black tracking-wider flex items-center gap-2 border ${statusInfo.bg}`}>
                                                {statusInfo.icon}
                                                {statusInfo.label.toUpperCase()}
                                            </div>
                                        </div>

                                        {/* Key Info Grid */}
                                        <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/30">
                                            <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4">
                                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                                                    <Calendar size={22} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">
                                                        Placed Date
                                                    </p>
                                                    <p className="text-base font-black text-slate-800">
                                                        {new Date(order.created_at).toLocaleDateString('en-US', { 
                                                            month: 'short', 
                                                            day: '2-digit', 
                                                            year: 'numeric' 
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4">
                                                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500">
                                                    <Tag size={22} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">
                                                        Item Count
                                                    </p>
                                                    <p className="text-base font-black text-slate-800">
                                                        {order.items?.length || 0} Parts Grouped
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-4 lg:col-span-1 sm:col-span-2">
                                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                                                    <span className="font-black text-lg">$</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">
                                                        Order Valuation
                                                    </p>
                                                    <p className="text-xl font-black text-slate-900">
                                                        ${parseFloat(order.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items Section */}
                                        <div className="px-6 md:px-8 pt-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="h-1 w-8 bg-[#FF9F43] rounded-full" />
                                                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                                                    Component Breakdown
                                                </h4>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 gap-4">
                                                {order.items?.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="group flex flex-col sm:flex-row items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 hover:border-[#FF9F43]/30 hover:bg-orange-50/10 transition-all"
                                                    >
                                                        <div className="flex items-center gap-5 w-full sm:w-auto">
                                                            <div className="w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                                {item.product?.files?.[0] ? (
                                                                    <img
                                                                        src={`/${item.product.files[0].file_path}`}
                                                                        className="w-full h-full object-cover"
                                                                        alt={item.product?.sku}
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                                                                        <Package size={32} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h5 className="font-black text-slate-900 text-base leading-tight">
                                                                    {item.product?.sku}
                                                                </h5>
                                                                <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1 max-w-xs">
                                                                    {item.product?.name || item.product?.description}
                                                                </p>
                                                                <div className="flex items-center gap-3 mt-3">
                                                                    <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                                                                        QTY: {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                                                                    </div>
                                                                    <div className="px-3 py-1 bg-orange-50 rounded-full text-[10px] font-black text-[#FF9F43] uppercase tracking-tighter">
                                                                        UNIT: ${parseFloat(item.price).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-4 sm:mt-0 w-full sm:w-auto text-right border-t sm:border-none pt-4 sm:pt-0">
                                                            <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">
                                                                Row Total
                                                            </p>
                                                            <p className="text-xl font-black text-slate-900">
                                                                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Footer */}
                                        <div className="px-6 md:px-8 py-8 flex justify-end gap-4">
                                            <Link
                                                href={route('orders.show', order.id)}
                                                className="flex items-center gap-3 bg-[#FF9F43] text-white pl-8 pr-3 py-3 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-orange-100 transition-all active:scale-95 group"
                                            >
                                                View Order Details
                                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
