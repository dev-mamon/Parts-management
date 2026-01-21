import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { 
    ShoppingCart, 
    Search, 
    Eye, 
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    Package,
    Calendar,
    ChevronDown,
    MapPin,
    CreditCard
} from "lucide-react";

export default function Index({ orders, filters, counts = {} }) {
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "all");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        router.get(route('admin.orders.index'), { search, status, per_page: filters.per_page }, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsLoading(false)
        });
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsLoading(true);
        router.get(route('admin.orders.index'), { search, status: newStatus, per_page: filters.per_page }, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsLoading(false)
        });
    };

    const getStatusBadge = (status) => {
        const config = {
            pending: { classes: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500", icon: <Clock size={12} /> },
            processing: { classes: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500", icon: <Package size={12} /> },
            picked_up: { classes: "bg-purple-50 text-purple-700 border-purple-100", dot: "bg-purple-500", icon: <Truck size={12} /> },
            delivered: { classes: "bg-emerald-50 text-emerald-700 border-emerald-100", dot: "bg-emerald-500", icon: <CheckCircle2 size={12} /> },
            cancelled: { classes: "bg-rose-50 text-rose-700 border-rose-100", dot: "bg-rose-500", icon: <XCircle size={12} /> },
        };
        const theme = config[status?.toLowerCase()] || { classes: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400", icon: <Clock size={12} /> };
        
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${theme.classes}`}>
                <span className={`inline-flex rounded-full h-1.5 w-1.5 ${theme.dot}`}></span>
                {status?.charAt(0).toUpperCase() + status?.slice(1).replace('_', ' ')}
            </span>
        );
    };

    const isDataLoading = isLoading && orders.data.length > 0;

    return (
        <AdminLayout>
            <Head title="Orders" />
            
            <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
                {/* Header Section - Same as Product/Index */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                            Orders
                        </h1>
                        <p className="text-slate-500 mt-1">Track and manage customer transactions.</p>
                    </div>
                </div>

                {/* Tabs - Same as Product/Index */}
                <div className="flex items-center gap-6 mb-4 px-1 text-sm border-b border-slate-200 overflow-x-auto custom-scrollbar whitespace-nowrap scroll-smooth">
                    {[
                        { id: "all", label: "All Orders", count: counts.all },
                        { id: "pending", label: "Pending", count: counts.pending },
                        { id: "processing", label: "Processing", count: counts.processing },
                        { id: "picked_up", label: "Picked Up", count: counts.picked_up },
                        { id: "delivered", label: "Delivered", count: counts.delivered },
                        { id: "cancelled", label: "Cancelled", count: counts.cancelled }
                    ].map((tab) => (
                        <button 
                            key={tab.id} 
                            onClick={() => handleStatusChange(tab.id)} 
                            disabled={isLoading}
                            className={`pb-3 transition-all relative font-semibold text-[13px] flex-shrink-0 ${status === tab.id ? "text-[#FF9F43]" : "text-slate-500 hover:text-slate-700"} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {tab.label} <span className="ml-1 text-slate-400 font-medium">({tab.count?.toLocaleString() || 0})</span>
                            {status === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF9F43] rounded-full" />}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative">
                    {/* Linear Progress Bar */}
                    {isLoading && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FF9F43]/10 overflow-hidden z-20">
                            <div className="h-full bg-[#FF9F43] animate-progress-indeterminate w-1/3 rounded-full" />
                        </div>
                    )}

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-between p-4 border-b border-slate-100 gap-4">
                        <div className="flex flex-wrap items-center gap-3 flex-1">
                            <form onSubmit={handleSearch} className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text" 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search order number or customer..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-[13px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 transition-all outline-none border focus:border-[#FF9F43]"
                                />
                            </form>
                        </div>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-100">
                                    <th className="py-3 px-6">Order Info</th>
                                    <th className="py-3 px-6">Customer</th>
                                    <th className="py-3 px-6 text-center">Items</th>
                                    <th className="py-3 px-6">Amount</th>
                                    <th className="py-3 px-6">Payment</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-right pr-10">Actions</th>
                                </tr>
                            </thead>
                            
                            <tbody className={`divide-y divide-slate-50 transition-all duration-300 ${
                                isDataLoading ? 'opacity-40 grayscale-[0.5] pointer-events-none' : 'opacity-100'
                            }`}>
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/30 transition-all duration-150 group">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-bold text-slate-800 tracking-tight mb-0.5">#{order.order_number}</span>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                                                    <Calendar size={12} className="opacity-60" />
                                                    {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-bold text-slate-800 text-[13px] leading-snug mb-0.5 line-clamp-1">{order.user.first_name} {order.user.last_name}</span>
                                                <span className="text-[11px] text-slate-400 font-medium truncate">{order.user.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="inline-flex items-center justify-center px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold">
                                                {order.items_count} items
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col leading-tight">
                                                <span className="text-slate-800 font-black text-[14px] tracking-tight">${parseFloat(order.total_amount).toFixed(2)}</span>
                                                <span className="text-[10px] text-slate-400 font-medium tracking-wide capitalized">USD Currency</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {order.payment ? (
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${order.payment.status === 'succeeded' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                                    <span className={`text-[11px] font-bold uppercase tracking-wider ${order.payment.status === 'succeeded' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                        {order.payment.status}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Manual/Error</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="py-4 px-6 text-right pr-6">
                                            <Link 
                                                href={route('admin.orders.show', order.id)}
                                                className="inline-flex items-center justify-center w-9 h-9 text-slate-400 hover:text-[#e68a30] hover:bg-white bg-transparent border border-transparent hover:border-slate-200 rounded-xl transition-all duration-200 shadow-none hover:shadow-sm"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {orders.data.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="py-20 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                                    <ShoppingCart size={24} className="text-slate-300" />
                                                </div>
                                                <h3 className="text-slate-800 font-bold text-[15px]">No orders found</h3>
                                                <p className="text-slate-400 text-[13px] mt-1 max-w-[240px]">We couldn't find any orders matching your current criteria.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-slate-50 bg-slate-50/30">
                        <Pagination meta={orders} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
