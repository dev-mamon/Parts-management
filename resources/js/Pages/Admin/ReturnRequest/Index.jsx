import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { 
    RefreshCw, 
    Search, 
    Eye, 
    Clock,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Calendar,
    User,
    Hash,
    AlertCircle,
    ChevronRight,
    MessageSquare
} from "lucide-react";

export default function Index({ requests, filters, counts = {} }) {
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "all");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        router.get(route('admin.returns.index'), { search, status, per_page: filters.per_page }, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsLoading(false)
        });
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsLoading(true);
        router.get(route('admin.returns.index'), { search, status: newStatus, per_page: filters.per_page }, {
            preserveState: true,
            replace: true,
            onFinish: () => setIsLoading(false)
        });
    };

    const getStatusBadge = (status) => {
        const config = {
            pending: { classes: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500", icon: <Clock size={12} /> },
            approved: { classes: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500", icon: <CheckCircle2 size={12} /> },
            rejected: { classes: "bg-rose-50 text-rose-700 border-rose-100", dot: "bg-rose-500", icon: <XCircle size={12} /> },
            completed: { classes: "bg-emerald-50 text-emerald-700 border-emerald-100", dot: "bg-emerald-500", icon: <CheckCircle2 size={12} /> },
        };
        const theme = config[status?.toLowerCase()] || { classes: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400", icon: <Clock size={12} /> };
        
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${theme.classes}`}>
                <span className={`inline-flex rounded-full h-1.5 w-1.5 ${theme.dot}`}></span>
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </span>
        );
    };

    const isDataLoading = isLoading && requests.data.length > 0;

    return (
        <AdminLayout>
            <Head title="Return Requests" />
            
            <div className="p-8 bg-[#F8FAFC] min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                            Returns
                        </h1>
                        <p className="text-slate-500 mt-1">Review and process customer return requests.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 mb-4 px-1 text-sm border-b border-slate-200 overflow-x-auto custom-scrollbar whitespace-nowrap scroll-smooth">
                    {[
                        { id: "all", label: "All Requests", count: counts.all },
                        { id: "pending", label: "Pending", count: counts.pending },
                        { id: "approved", label: "Approved", count: counts.approved },
                        { id: "completed", label: "Completed", count: counts.completed },
                        { id: "rejected", label: "Rejected", count: counts.rejected }
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
                                    placeholder="Search by order, customer or reason..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-[13px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 transition-all outline-none border focus:border-[#FF9F43]"
                                />
                            </form>
                        </div>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-500 font-bold text-[11px] uppercase tracking-widest border-b border-slate-100 italic">
                                    <th className="py-4 px-6">Return Info</th>
                                    <th className="py-4 px-6">Order</th>
                                    <th className="py-4 px-6">Customer</th>
                                    <th className="py-4 px-6">Reason</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-right pr-10">Actions</th>
                                </tr>
                            </thead>
                            
                            <tbody className={`divide-y divide-slate-50 transition-all duration-300 ${
                                isDataLoading ? 'opacity-40 grayscale-[0.5] pointer-events-none' : 'opacity-100'
                            }`}>
                                {requests.data.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50/30 transition-all duration-150 group">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                                                    <Calendar size={12} className="opacity-60" />
                                                    {new Date(req.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </div>
                                                <span className="text-[13px] font-black text-slate-800 tracking-tight">REQ-{req.id.toString().padStart(5, '0')}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Link 
                                                href={route('admin.orders.show', req.order_id)}
                                                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-700 hover:text-[#FF9F43] transition-colors"
                                            >
                                                <Hash size={14} className="opacity-40" />
                                                #{req.order.order_number}
                                            </Link>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-black text-slate-800 text-[14px] leading-tight mb-0.5 line-clamp-1">{req.user.first_name} {req.user.last_name}</span>
                                                <span className="text-[11px] text-slate-400 font-bold tracking-tight truncate">{req.user.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-start gap-2 max-w-[240px]">
                                                <MessageSquare size={14} className="text-slate-300 mt-0.5 shrink-0" />
                                                <span className="text-[12px] text-slate-600 font-medium italic line-clamp-2">"{req.reason}"</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            {getStatusBadge(req.status)}
                                        </td>
                                        <td className="py-4 px-6 text-right pr-6">
                                            <Link 
                                                href={route('admin.returns.show', req.id)}
                                                className="inline-flex items-center justify-center w-9 h-9 text-slate-400 hover:text-[#e68a30] hover:bg-white bg-transparent border border-transparent hover:border-slate-200 rounded-xl transition-all duration-200 shadow-none hover:shadow-sm"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {requests.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                                    <RotateCcw size={24} className="text-slate-300" />
                                                </div>
                                                <h3 className="text-slate-800 font-bold text-[15px]">No requests found</h3>
                                                <p className="text-slate-400 text-[13px] mt-1 max-w-[240px]">We couldn't find any return requests matching your current criteria.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-slate-50 bg-slate-50/30">
                        <Pagination meta={requests} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
