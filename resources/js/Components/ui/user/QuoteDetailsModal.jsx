import React from "react";
import { X, Bookmark, ImageOff } from "lucide-react";

export default function QuoteDetailsModal({ isOpen, onClose, quote }) {
    if (!isOpen || !quote) return null;

    const statusColors = {
        active: "bg-green-100 text-green-700",
        expiring: "bg-orange-100 text-orange-700",
        expired: "bg-red-100 text-red-700",
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300">
            <div 
                className="bg-white rounded-[16px] w-full max-w-lg shadow-2xl relative overflow-hidden transition-all duration-300 animate-in fade-in zoom-in slide-in-from-bottom-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Section */}
                <div className="p-6 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-[14px] flex items-center justify-center border border-slate-100">
                            <Bookmark className="w-6 h-6 text-[#A80000]" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            Quote Details
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                    >
                        <X size={16} strokeWidth={3} />
                    </button>
                </div>

                {/* Metadata Body */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 block uppercase">
                                Quote ID
                            </span>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {quote.quote_number}
                            </h3>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold capitalize ${statusColors[quote.status] || "bg-gray-100 text-gray-700"}`}>
                            {quote.status}
                        </span>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Items Section */}
                    <div>
                        <h4 className="text-[15px] font-bold text-slate-900 mb-4 tracking-tight">
                            Sample Items
                        </h4>
                        <div className="space-y-3">
                            {quote.items?.map((item) => (
                                <div 
                                    key={item.id}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-[#F8F9FA] hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                >
                                    <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-slate-100 flex items-center justify-center">
                                        {item.product?.files?.[0]?.file_path ? (
                                            <img
                                                src={`/storage/${item.product.files[0].file_path}`}
                                                className="w-full h-full object-cover"
                                                alt={item.product?.name}
                                            />
                                        ) : (
                                            <ImageOff className="w-4 h-4 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-[13px] font-bold text-slate-700 leading-tight">
                                            {item.product?.name} <span className="text-slate-400 ml-1">× {item.quantity}</span>
                                        </h5>
                                    </div>
                                    <div className="text-[14px] font-black text-slate-900 tracking-tight">
                                        ${(item.quantity * item.price_at_quote).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer / Total info could go here if needed, keeping it minimal as per image */}
                <div className="p-4 border-t border-slate-50 flex justify-end">
                     <button 
                        onClick={onClose}
                        className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-95"
                     >
                        Close
                     </button>
                </div>
            </div>
        </div>
    );
}
