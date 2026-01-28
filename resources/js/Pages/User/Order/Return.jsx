import React, { useState, useEffect } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import { Skeleton } from "@/Components/ui/Skeleton";
import RequestModal from "./RequestModal";
import { 
    FileText, Package, Box, CheckCircle, Clock, 
    RotateCcw, Calendar, Hash, XCircle, 
    MessageSquare, AlertTriangle 
} from "lucide-react";

// --- Advanced Skeleton Component ---
const ReturnCardSkeleton = () => (
    <div className="bg-white rounded-sm shadow-sm border border-slate-100 p-6 md:p-8 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 pb-8 border-b border-slate-50">
            <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-32" />
                    <div className="flex gap-4">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <Skeleton className="h-8 w-24 rounded-full" />
                <div className="space-y-1 text-right">
                    <Skeleton className="h-2 w-16 ml-auto" />
                    <Skeleton className="h-6 w-24 ml-auto" />
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <Skeleton className="h-3 w-32" />
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3">
                    <Skeleton className="h-12 w-full rounded-xl" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>
            </div>
            <div className="space-y-4">
                <Skeleton className="h-3 w-32" />
                <div className="space-y-5">
                    <div className="flex gap-4">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <div className="space-y-1">
                            <Skeleton className="h-2 w-12" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-16 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    </div>
);

export default function OrderReturn() {
    const { auth, returns, orders, selected_order_id } = usePage().props;
    const returnList = Array.isArray(returns) ? returns : [];
    const [isLoading, setIsLoading] = useState(returnList.length > 0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (selected_order_id) {
            setIsModalOpen(true);
        }
    }, [selected_order_id]);

    useEffect(() => {
        if (returnList.length === 0) {
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => setIsLoading(false), 1200);
            return () => clearTimeout(timer);
        }
    }, [returnList.length]);

    const getStatusStyles = (status) => {
        const styles = {
            completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
            approved: "bg-amber-50 text-amber-600 border-amber-100",
            pending: "bg-blue-50 text-blue-600 border-blue-100",
            rejected: "bg-rose-50 text-rose-600 border-rose-100",
        };
        return styles[status] || "bg-gray-50 text-gray-600 border-gray-100";
    };

    return (
        <>
            <Head title="My Return Requests" />
            <div className="p-4 md:p-8 bg-[#F8F9FB] min-h-screen">
                <div className="max-w-9xl mx-auto">
                    
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Return Requests</h1>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Manage your order returns and track their status.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href={route('orders.history')}
                                className="px-5 py-2.5 bg-slate-800 rounded-full text-sm font-bold text-white hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-sm"
                            >
                                <Package className="w-4 h-4 text-white" />
                                Order History
                            </Link>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#AD0100] hover:bg-red-800 text-white px-6 py-2.5 rounded-full font-black text-sm flex items-center gap-2 transition-all shadow-sm active:scale-95"
                            >
                                <RotateCcw className="w-4 h-4" /> New Return
                            </button>
                        </div>
                    </div>

                    {/* Content Logic */}
                    {isLoading ? (
                        <div className="space-y-10">
                            {returnList.slice(0, 2).map((_, i) => (
                                <ReturnCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : returnList.length === 0 ? (
                        <div className="bg-white p-20 rounded-md border border-slate-100 text-center shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Box className="w-8 h-8 text-slate-200" />
                            </div>
                            <h2 className="text-xl font-black text-slate-900">
                                No return requests yet
                            </h2>
                            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
                                When you submit a return request for a delivered order, it will appear here.
                            </p>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="mt-8 px-8 py-3 bg-[#AD0100] text-white rounded-full font-bold text-sm hover:shadow-lg hover:shadow-red-200 transition-all active:scale-95 inline-block"
                            >
                                Start a new return request
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {returnList.map((ret) => (
                                <div
                                    key={ret.id}
                                    className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="p-6 md:p-8">
                                        {/* Request Header */}
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 pb-8 border-b border-slate-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 border border-red-100">
                                                    <RotateCcw className="w-7 h-7 text-[#AD0100]" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Request ID</span>
                                                        <h3 className="font-black text-slate-900 text-lg">RET-{ret.id.toString().padStart(5, '0')}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                                                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 opacity-60" /> {new Date(ret.created_at).toLocaleDateString()}</span>
                                                        <span className="flex items-center gap-1.5"><Hash className="w-3.5 h-3.5 opacity-60" /> Order #{ret.order.order_number}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                                                <div className={`px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wider flex items-center gap-2 ${getStatusStyles(ret.status)}`}>
                                                    {ret.status === "pending" && <Clock className="w-3.5 h-3.5" />}
                                                    {ret.status === "approved" && <CheckCircle className="w-3.5 h-3.5" />}
                                                    {ret.status === "rejected" && <XCircle className="w-3.5 h-3.5" />}
                                                    {ret.status}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Order Value</p>
                                                    <p className="text-xl font-black text-slate-900">${parseFloat(ret.order.total_amount).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Left Column: Items */}
                                            <div className="space-y-4">
                                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Items in this return</h4>
                                                <div className="space-y-3 bg-slate-50/50 p-4 rounded-3xl border border-slate-100">
                                                    {ret.order.items.map((item) => (
                                                        <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100/50 shadow-sm">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden border border-slate-100 shrink-0">
                                                                    {item.product.files?.[0] ? (
                                                                        <img 
                                                                            src={`/${item.product.files[0].thumbnail_path || item.product.files[0].file_path}`} 
                                                                            className="w-full h-full object-cover" 
                                                                        />
                                                                    ) : <Package className="w-5 h-5 text-slate-200" />}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-xs font-black text-slate-800 truncate">{item.product.sku}</p>
                                                                    <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{item.product.name}</p>
                                                                </div>
                                                            </div>
                                                            <span className="text-xs font-black text-slate-900 shrink-0 px-2">×{item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right Column: Reason & Description */}
                                            <div className="space-y-4">
                                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Return Information</h4>
                                                <div className="space-y-5">
                                                    <div className="flex gap-4">
                                                        <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center shrink-0 text-slate-400">
                                                            <MessageSquare className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Reason</p>
                                                            <p className="text-sm font-bold text-slate-700">{ret.reason}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="p-5 bg-red-50/30 rounded-3xl border border-red-100/50 italic">
                                                        <p className="text-[13px] text-slate-600 leading-relaxed font-medium">"{ret.description}"</p>
                                                    </div>

                                                    {ret.rejection_reason && (
                                                        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                                                            <div className="flex items-center gap-2 text-rose-600 text-[11px] font-black uppercase tracking-widest mb-1">
                                                                <AlertTriangle size={14} /> Admin Feedback
                                                            </div>
                                                            <p className="text-[13px] text-rose-700 font-medium">"{ret.rejection_reason}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <RequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                orders={orders}
                selectedId={selected_order_id}
            />
        </>
    );
}

OrderReturn.layout = page => <UserLayout children={page} />;
