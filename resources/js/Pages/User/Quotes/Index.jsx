import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, router } from "@inertiajs/react";
import { 
    Calendar, 
    ChevronRight, 
    ShoppingCart, 
    Trash2, 
    FileText, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import QuoteDetailsModal from "@/Components/ui/user/QuoteDetailsModal";
import { useState } from "react";

export default function Index({ quotes }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this quote?")) {
            router.delete(route("quotes.destroy", id), {
                onSuccess: () => toast.success("Quote deleted successfully"),
            });
        }
    };

    const [selectedQuote, setSelectedQuote] = useState(null);
    const [isIdModalOpen, setIsIdModalOpen] = useState(false);

    const handleOpenModal = (quote) => {
        setSelectedQuote(quote);
        setIsIdModalOpen(true);
    };

    const handleConvert = (id) => {
        router.post(route("quotes.convert", id), {}, {
            onSuccess: () => toast.success("Quote converted to cart!"),
        });
    };

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "bg-green-50 text-green-600 border-green-100";
            case "expiring_soon":
                return "bg-amber-50 text-amber-600 border-amber-100";
            case "expired":
                return "bg-rose-50 text-rose-600 border-rose-100";
            default:
                return "bg-slate-50 text-slate-600 border-slate-100";
        }
    };

    return (
        <UserLayout>
            <Head title="Saved Quotes" />
            <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen font-sans">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Saved Quotes</h1>
                    <p className="text-slate-500 mt-1 text-sm md:text-base font-medium">Manage and convert your saved parts quotations.</p>
                </div>

                {quotes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {quotes.map((quote) => (
                            <div key={quote.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-all group relative overflow-hidden">
                                {/* Status Badge */}
                                <div className="absolute top-6 right-6">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                        getStatusStyles(quote.status)
                                    )}>
                                        {quote.status?.replace('_', ' ')}
                                    </span>
                                </div>

                                {/* Header Section */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-rose-500 shrink-0">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-lg font-bold text-slate-900 leading-none mb-1 group-hover:text-[#FF9F43] transition-colors">{quote.title}</h3>
                                        <p className="text-[12px] font-mono text-slate-400 font-bold uppercase">{quote.quote_number}</p>
                                    </div>
                                </div>

                                {/* Dates Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Created</span>
                                        </div>
                                        <p className="text-[13px] font-bold text-slate-700">{new Date(quote.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <div className="flex items-center gap-1.5 text-slate-400 justify-end">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Valid Until</span>
                                        </div>
                                        <p className="text-[13px] font-bold text-slate-700">{new Date(quote.valid_until).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Summary Box */}
                                <div className="bg-slate-50/50 rounded-2xl p-4 flex items-center justify-between mb-8 border border-slate-100">
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Total Items</span>
                                        <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Package className="w-4 h-4 text-slate-400" />
                                            {quote.items_count} parts
                                        </p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Quote Total</span>
                                        <p className="text-lg font-black text-slate-900 tracking-tight">${parseFloat(quote.total_amount).toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => handleConvert(quote.id)}
                                        className="flex-1 bg-[#A80000] text-white h-12 rounded-full font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-rose-900 transition-all active:scale-95 group/btn"
                                    >
                                        Convert to Order
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                                            <ShoppingCart className="w-3 h-3" />
                                        </div>
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleOpenModal(quote)}
                                        className="px-6 h-12 rounded-full border border-[#A80000] text-[#A80000] font-bold text-[11px] uppercase tracking-widest flex items-center justify-center hover:bg-rose-50 transition-all active:scale-95"
                                    >
                                        View Details
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(quote.id)}
                                        className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center justify-center border border-slate-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[24px] p-20 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 font-medium italic">
                            <FileText className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 mt-4 tracking-tight">No saved quotes found</h3>
                        <p className="text-slate-500 max-w-sm mb-8 font-medium italic">Bookmark parts from the shop to build your first quotation and save it for later.</p>
                        <Link 
                            href={route('parts.index')}
                            className="bg-[#FF9F43] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#e68a30] transition-all shadow-lg shadow-[#FF9F43]/20"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>

            <QuoteDetailsModal 
                isOpen={isIdModalOpen}
                onClose={() => setIsIdModalOpen(false)}
                quote={selectedQuote}
            />
        </UserLayout>
    );
}
