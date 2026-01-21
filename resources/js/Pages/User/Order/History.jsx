import React, { useState, useEffect } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { Skeleton } from "@/Components/ui/Skeleton";
import ConfirmAction from "@/Components/ui/ConfirmCheckout";
import {
    Search,
    FileText,
    Package,
    ArrowUpRight,
    ChevronRight,
    Box,
    CheckCircle,
    XCircle,
} from "lucide-react";

// --- Premium Skeleton Component ---
const HistoryCardSkeleton = () => (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-8 mb-8">
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-50">
            <div className="flex gap-4 items-center">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                </div>
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
        </div>
        
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-8">
                <div className="space-y-1">
                    <Skeleton className="h-2 w-10" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-1 border-l border-slate-50 pl-8">
                    <Skeleton className="h-2 w-10" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
            <div className="text-right space-y-1">
                <Skeleton className="h-2 w-16 ml-auto" />
                <Skeleton className="h-8 w-24 ml-auto" />
            </div>
        </div>

        <div className="space-y-3">
            {[1].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-16 h-16 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-48" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Skeleton className="h-2 w-12 ml-auto" />
                        <Skeleton className="h-4 w-16 ml-auto" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function OrderHistory() {
    const { auth, orders } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const orderList = Array.isArray(orders) ? orders : [];

    // Filter for History (Delivered and Cancelled)
    const historicalOrders = orderList.filter((order) =>
        ["delivered", "cancelled"].includes(order.status),
    );

    useEffect(() => {
        // যদি হিস্টোরি একদম খালি থাকে, তবে লোডিং সরাসরি ফলস করে দেব যাতে স্কেলিটন না আসে
        if (historicalOrders.length === 0) {
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => setIsLoading(false), 800);
            return () => clearTimeout(timer);
        }
    }, [historicalOrders.length]);

    const filteredOrders = historicalOrders.filter((order) =>
        order.order_number.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const getStatusConfig = (status) => {
        const configs = {
            delivered: {
                icon: <CheckCircle className="w-4 h-4" />,
                bgColor: "bg-[#F0FDF4]",
                textColor: "text-[#16A34A]",
                borderColor: "border-[#DCFCE7]",
                label: "Delivered",
            },
            cancelled: {
                icon: <XCircle className="w-4 h-4" />,
                bgColor: "bg-[#FEF2F2]",
                textColor: "text-[#DC2626]",
                borderColor: "border-[#FEE2E2]",
                label: "Cancelled",
            },
        };
        return (
            configs[status] || {
                icon: <Package className="w-4 h-4" />,
                bgColor: "bg-gray-50",
                textColor: "text-gray-700",
                borderColor: "border-gray-200",
                label: status,
            }
        );
    };

    return (
        <UserLayout user={auth.user}>
            <Head title="Order History" />
            <div className="p-6 bg-[#F8F9FB] min-h-screen">
                <div className="max-w-8xl mx-auto">
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="relative min-w-[300px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search past orders..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:ring-1 focus:ring-red-500 outline-none"
                                />
                            </div>
                            <Link
                                href={route("orders.active")}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-slate-700 hover:bg-gray-50 transition-colors"
                            >
                                <Package className="w-4 h-4" />
                                Active Orders
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    {isLoading ? (
                        <div className="space-y-6">
                            {historicalOrders.slice(0, 2).map((_, i) => (
                                <HistoryCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="bg-white p-16 rounded-2xl border border-gray-200 text-center">
                            <Box className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-slate-900">
                                No order history found
                            </h2>
                            <Link
                                href={route("parts.index")}
                                className="text-red-600 font-bold mt-4 inline-block hover:underline"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {filteredOrders.map((order) => {
                                const status = getStatusConfig(order.status);
                                return (
                                    <div
                                        key={order.id}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow"
                                    >
                                        {/* Order Header */}
                                        <div className="p-6 flex flex-wrap justify-between items-start gap-4 border-b border-gray-50">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-700">
                                                        Order {order.order_number}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div
                                                className={`px-4 py-1.5 rounded-full border ${status.borderColor} ${status.bgColor} flex items-center gap-2 text-[11px] font-black uppercase tracking-wider ${status.textColor}`}
                                            >
                                                {status.icon} {status.label}
                                            </div>
                                        </div>

                                        {/* Summary Row */}
                                        <div className="px-6 py-6 flex justify-between items-center bg-white">
                                            <div className="flex items-center gap-8">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                                        Date
                                                    </span>
                                                    <span className="text-sm font-black text-slate-900">
                                                        {new Date(order.created_at).toLocaleDateString("en-CA")}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col border-l border-gray-100 pl-8">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                                        Items
                                                    </span>
                                                    <span className="text-sm font-black text-slate-900">
                                                        {order.items?.length || 0} parts
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                                                    Total Amount
                                                </p>
                                                <p className="text-2xl font-black text-slate-900">
                                                    ${parseFloat(order.total_amount).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Items List */}
                                        <div className="px-6 pb-6">
                                            <div className="space-y-3">
                                                {order.items?.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                                                                {item.product?.files?.[0] ? (
                                                                    <img
                                                                        src={`/${item.product.files[0].file_path}`}
                                                                        className="w-full h-full object-cover"
                                                                        alt=""
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                                                        <Package className="w-6 h-6" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h5 className="font-black text-slate-900 text-sm uppercase">
                                                                    {item.product?.sku}
                                                                </h5>
                                                                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                                                                    {item.product?.description}
                                                                </p>
                                                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                                                                    QTY: {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                                                                Total
                                                            </p>
                                                            <p className="font-black text-slate-900 text-sm">
                                                                ${parseFloat(item.price).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions Footer */}
                                        <div className="px-6 py-5 bg-gray-50/30 border-t border-gray-100 flex justify-end gap-3">
                                            <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-slate-700 hover:bg-gray-100 transition-colors">
                                                Download Invoice
                                            </button>
                                            <ConfirmAction
                                                id={order.id}
                                                routeName="orders.reorder"
                                                title="Re-order Items?"
                                                text="Add these items to your cart?"
                                                confirmButtonText="Yes, Re-order"
                                                buttonText="Re-order"
                                                icon={ArrowUpRight}
                                                className="flex items-center gap-3 bg-[#AD0100] text-white pl-8 pr-3 py-2.5 rounded-full font-bold text-xs hover:bg-red-800 transition-all"
                                            />
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
