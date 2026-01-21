import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { 
    ChevronLeft, 
    RotateCcw, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar,
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    Hash,
    Info,
    MessageSquare,
    AlertTriangle,
    Image as ImageIcon,
    Save,
    ChevronRight,
} from "lucide-react";

export default function Show({ returnRequest }) {
    const { data, setData, patch, processing } = useForm({
        status: returnRequest.status,
        rejection_reason: returnRequest.rejection_reason || ""
    });

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        patch(route('admin.returns.update-status', returnRequest.id), {
            preserveScroll: true
        });
    };

    const getStatusStyle = (status) => {
        const config = {
            pending: { classes: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500", icon: <Clock size={14} /> },
            approved: { classes: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500", icon: <CheckCircle2 size={14} /> },
            rejected: { classes: "bg-rose-50 text-rose-700 border-rose-100", dot: "bg-rose-500", icon: <XCircle size={14} /> },
            completed: { classes: "bg-emerald-50 text-emerald-700 border-emerald-100", dot: "bg-emerald-500", icon: <CheckCircle2 size={14} /> },
        };
        const theme = config[status?.toLowerCase()] || { classes: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400", icon: <Clock size={14} /> };
        
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${theme.classes}`}>
                <span className={`inline-flex rounded-full h-1.5 w-1.5 ${theme.dot}`}></span>
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </span>
        );
    };

    return (
        <AdminLayout>
            <Head title={`Return Request REQ-${returnRequest.id}`} />

            <div className="p-8 bg-[#F8FAFC] min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">REQ-{returnRequest.id.toString().padStart(5, '0')}</h1>
                            {getStatusStyle(returnRequest.status)}
                        </div>
                        <div className="flex items-center gap-5 mt-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <span className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm"><Calendar size={12} className="text-[#FF9F43]" /> {new Date(returnRequest.created_at).toLocaleString()}</span>
                            <span className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm"><Hash size={12} className="text-[#FF9F43]" /> Order #{returnRequest.order.order_number}</span>
                        </div>
                    </div>
                    <Link
                        href={route("admin.returns.index")}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        <ChevronLeft size={16} /> Back to Returns
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN: Return Details */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Core Request Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <RotateCcw size={18} className="text-[#FF9F43]" />
                                Return Request Details
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-slate-700 block px-1">Reason for Return</label>
                                    <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-[14px] font-bold text-slate-800">
                                        {returnRequest.reason}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-slate-700 block px-1">Description</label>
                                    <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 text-[13px] text-slate-600 leading-relaxed font-bold italic">
                                        "{returnRequest.description || 'No detailed description provided.'}"
                                    </div>
                                </div>

                                {returnRequest.image_path && (
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-semibold text-slate-700 block px-1">Attached Evidence</label>
                                        <div className="w-full max-w-md rounded-2xl border border-slate-100 overflow-hidden shadow-sm aspect-video bg-slate-50 flex items-center justify-center p-2 group cursor-pointer">
                                            <img 
                                                src={`/${returnRequest.image_path}`} 
                                                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500" 
                                                alt="Return Evidence" 
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Decision Management */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <Info size={18} className="text-[#FF9F43]" />
                                Administrative Decision
                            </h3>
                            
                            <form onSubmit={handleStatusUpdate} className="space-y-6">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-semibold text-slate-700 block px-1">Update Status</label>
                                        <select 
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full bg-slate-50 border-slate-200 rounded-xl text-[13px] font-black text-slate-800 py-3 px-4 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none shadow-sm"
                                        >
                                            <option value="pending">Pending Review</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="completed">Completed/Refunded</option>
                                        </select>
                                    </div>
                               </div>

                               {data.status === 'rejected' && (
                                   <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                       <label className="text-[13px] font-semibold text-rose-600 block px-1 flex items-center gap-2">
                                           <AlertTriangle size={14} /> Rejection Reason
                                       </label>
                                       <textarea 
                                           value={data.rejection_reason}
                                           onChange={(e) => setData('rejection_reason', e.target.value)}
                                           placeholder="Explain why this request is being rejected..."
                                           className="w-full bg-slate-50 border-slate-200 rounded-xl text-[13px] font-medium text-slate-700 py-4 px-5 focus:ring-rose-500/10 focus:border-rose-500 transition-all outline-none min-h-[120px]"
                                       />
                                   </div>
                               )}

                               <button 
                                    type="submit"
                                    disabled={processing || (data.status === returnRequest.status && data.rejection_reason === returnRequest.rejection_reason)}
                                    className="w-full md:w-auto min-w-[200px] bg-[#FF9F43] text-white h-[50px] rounded-xl font-black text-[14px] hover:bg-[#e68a30] transition-all active:scale-95 disabled:opacity-50 shadow-sm flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                                    ) : <Save size={18} />}
                                    Update Request
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Customer & Order Snapshot */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Customer Snapshot */}
                        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <User size={18} className="text-[#FF9F43]" />
                                Requester
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                        <User size={20} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <label className="text-[13px] font-semibold text-slate-400 block mb-0.5">Customer Name</label>
                                        <span className="text-[15px] font-black text-slate-900 truncate">{returnRequest.user.first_name} {returnRequest.user.last_name}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <Mail size={14} className="text-slate-300" />
                                        <span className="text-[13px] text-slate-600 font-medium">{returnRequest.user.email}</span>
                                    </div>
                                    {returnRequest.user.phone_number && (
                                        <div className="flex items-center gap-3">
                                            <Phone size={14} className="text-slate-300" />
                                            <span className="text-[13px] text-slate-600 font-medium">{returnRequest.user.phone_number}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Context */}
                        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 overflow-hidden">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <Package size={18} className="text-[#FF9F43]" />
                                Original Order
                            </h3>
                            <div className="space-y-5">
                                <Link 
                                    href={route('admin.orders.show', returnRequest.order_id)}
                                    className="block p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#FF9F43]/30 transition-all group"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-[13px] font-semibold text-slate-400 block">Order Info</label>
                                        <ChevronRight size={14} className="text-slate-300 group-hover:text-[#FF9F43] transition-colors" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#FF9F43] font-bold text-[12px] shadow-sm">
                                            #{returnRequest.order.order_number.slice(-2)}
                                        </div>
                                        <div>
                                            <span className="text-[14px] font-black text-slate-900 tracking-tight">#{returnRequest.order.order_number}</span>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">View Full Order History</p>
                                        </div>
                                    </div>
                                </Link>

                                <div className="flex flex-col gap-3">
                                    <label className="text-[13px] font-semibold text-slate-400 block px-1">Order Summary</label>
                                    <div className="p-4 bg-slate-50/30 rounded-2xl border border-slate-100 divide-y divide-slate-100">
                                        {returnRequest.order.items.map((item) => (
                                            <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                                    {item.product.files?.[0] ? (
                                                        <img src={`/${item.product.files[0].thumbnail_path}`} className="w-full h-full object-cover" alt="" />
                                                    ) : <Package size={16} className="text-slate-200" />}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[13px] font-black text-slate-900 truncate leading-snug">{item.product.description}</span>
                                                    <span className="text-[11px] text-slate-400 font-bold tracking-tight">Qty: {item.quantity} × ${parseFloat(item.price).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
