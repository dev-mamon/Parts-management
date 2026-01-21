import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    ChevronLeft, 
    FileText, 
    Calendar, 
    Clock, 
    ImageOff,
    CheckCircle2,
    ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Show({ quote }) {
    return (
        <UserLayout>
            <Head title={`Quote ${quote.quote_number}`} />
            <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen font-sans">
                {/* Back Button */}
                <Link 
                    href={route('quotes.index')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-6 group w-fit"
                >
                    <div className="p-2 bg-white rounded-full border border-slate-200 group-hover:bg-slate-50 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Back to Quotes</span>
                </Link>

                {/* Header Information */}
                <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-rose-500 shrink-0">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">{quote.title}</h1>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{quote.quote_number}</span>
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                        quote.status === 'active' ? "bg-green-50 text-green-600 border-green-100" : "bg-rose-50 text-rose-600 border-rose-100"
                                    )}>
                                        {quote.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-12 px-8 border-l border-slate-100 hidden md:flex">
                            <div className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Created On</span>
                                <p className="text-sm font-bold text-slate-800">{new Date(quote.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Valid Until</span>
                                <p className="text-sm font-bold text-slate-800">{new Date(quote.valid_until).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Quote Total</span>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">${parseFloat(quote.total_amount).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="bg-white rounded-[24px] border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Included Parts ({quote.items?.length || 0})</h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                    <th className="px-8 py-5">Product Details</th>
                                    <th className="px-8 py-5 text-center">Category</th>
                                    <th className="px-8 py-5 text-center">Qty</th>
                                    <th className="px-8 py-5 text-right">Unit Price</th>
                                    <th className="px-8 py-5 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {quote.items?.map((item) => (
                                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-14 rounded-xl border border-slate-100 bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                                                    {item.product.files?.[0] ? (
                                                        <img 
                                                            src={`/${item.product.files[0].file_path}`} 
                                                            alt={item.product.description} 
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <ImageOff className="w-5 h-5 text-slate-200" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-tight line-clamp-1">{item.product.description}</h4>
                                                    <p className="font-mono text-[10px] text-slate-400 font-bold uppercase">{item.product.sku}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                                {item.product.category?.name || 'Part'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-center font-bold text-slate-700">{item.quantity}</td>
                                        <td className="px-8 py-4 text-right font-bold text-slate-800">${parseFloat(item.price_at_quote || item.product.buy_price).toFixed(2)}</td>
                                        <td className="px-8 py-4 text-right">
                                            <span className="text-[14px] font-black text-slate-950 tracking-tight">
                                                ${(item.quantity * (item.price_at_quote || item.product.buy_price)).toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 bg-slate-50/30 flex justify-end items-center gap-10">
                         <div className="text-right">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimated Total</span>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">${parseFloat(quote.total_amount).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
