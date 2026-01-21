import React, { useState } from "react";
import { 
    X, 
    ShoppingCart, 
    Minus, 
    Plus, 
    Heart, 
    ImageOff,
    CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function ProductDetailsModal({ product, isOpen, onClose, onToggleFavorite }) {
    if (!isOpen || !product) return null;

    const [activeTab, setActiveTab] = useState("description"); // description, fitments, oem
    const [selectedImage, setSelectedImage] = useState(product.files?.[0]?.file_path || null);
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);

    const handleAddToCart = () => {
        setProcessing(true);
        router.post(route("parts.to-cart"), {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Added to cart!");
                onClose();
            },
            onFinish: () => setProcessing(false)
        });
    };

    const tabs = [
        { id: "oem", label: "OEM/ PARTSLINK" },
        { id: "description", label: "DESCRIPTION" },
        { id: "fitments", label: "FITMENTS" }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose} 
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-3xl rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:max-h-[90vh] animate-in zoom-in-95 duration-300 scale-100 font-sans">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute right-5 top-5 w-8 h-8 bg-slate-100/50 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all z-20 group border border-slate-200"
                >
                    <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-950 tracking-tight uppercase leading-none">{product.sku}</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Gallery Section */}
                        <div className="lg:col-span-12 flex flex-col md:flex-row gap-5">
                            {/* Thumbnails */}
                            <div className="flex md:flex-col gap-2 shrink-0 order-2 md:order-1 overflow-x-auto md:overflow-y-auto max-h-[300px] custom-scrollbar pb-2 md:pb-0">
                                {product.files?.map((file, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(file.file_path)}
                                        className={cn(
                                            "w-16 h-16 rounded-xl border transition-all shrink-0 overflow-hidden bg-slate-50",
                                            selectedImage === file.file_path 
                                                ? "border-[#FF9F43] ring-1 ring-[#FF9F43]/20 shadow-sm" 
                                                : "border-slate-100 hover:border-slate-300"
                                        )}
                                    >
                                        <img 
                                            src={`/${file.file_path}`} 
                                            alt={product.description} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="flex-1 h-[250px] md:h-[320px] rounded-[24px] bg-slate-50 border border-slate-100 overflow-hidden relative group order-1 md:order-2">
                                {selectedImage ? (
                                    <img 
                                        src={`/${selectedImage}`} 
                                        alt={product.description} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                        <ImageOff size={32} className="opacity-40" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase">No Preview</span>
                                    </div>
                                )}
                                
                                <button 
                                    onClick={() => onToggleFavorite(product.id)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/40 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all hover:scale-110 active:scale-90"
                                >
                                    <Heart size={18} className={cn(product.is_favorite && "fill-rose-500 text-rose-500")} />
                                </button>
                                </div>
                        </div>

                        {/* Tabs & Content */}
                        <div className="lg:col-span-12 space-y-6">
                            {/* Custom Nav Pills */}
                            <div className="flex p-1 bg-slate-100 rounded-full border border-slate-200 max-w-lg mx-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "flex-1 py-2 px-3 rounded-full text-[9px] md:text-[10px] font-bold tracking-wider transition-all duration-300 uppercase",
                                            activeTab === tab.id 
                                                ? "bg-white text-[#FF9F43] shadow-sm ring-1 ring-slate-200/50" 
                                                : "text-slate-500 hover:text-slate-900"
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="min-h-[140px]">
                                {activeTab === "description" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                                        <p className="text-[13px] text-slate-800 leading-relaxed font-semibold uppercase tracking-tight">
                                            {product.description}
                                        </p>
                                    </div>
                                )}

                                {activeTab === "fitments" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                                        <div className="overflow-x-auto rounded-2xl border border-slate-200/60 bg-white">
                                            <table className="w-full text-[11px] text-left border-collapse">
                                                <tbody className="divide-y divide-slate-100">
                                                    {product.fitments?.map((fit, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="py-2.5 px-4 text-slate-900 font-bold uppercase tracking-tight">
                                                                {fit.year_from} {fit.make} {fit.model}
                                                            </td>
                                                            <td className="py-2.5 px-4 text-slate-500 font-medium uppercase tracking-tight text-right">
                                                                {fit.year_to} {fit.make} {fit.model}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {(!product.fitments || product.fitments.length === 0) && (
                                                        <tr>
                                                            <td className="py-6 text-center text-slate-400 italic">No fitment data available.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "oem" && (
                                    <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {product.parts_numbers?.map((pn, idx) => (
                                                <div key={idx} className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between group hover:border-[#FF9F43]/30 transition-all shadow-sm">
                                                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter">{pn.part_number}</span>
                                                    <CheckCircle2 size={12} className="text-[#FF9F43] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                            {(!product.parts_numbers || product.parts_numbers.length === 0) && (
                                                <div className="col-span-full py-6 text-center text-slate-400 italic">No OEM codes available.</div>
                                            )}
                                         </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="bg-slate-50/50 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-slate-200/60">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">List Price</span>
                            <span className="text-slate-500 text-xs font-semibold line-through tracking-tighter">${parseFloat(product.list_price).toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-[#FF9F43] uppercase tracking-widest mb-0.5">Your Price</span>
                            <span className="text-xl font-bold text-slate-950 tracking-tighter">${parseFloat(product.buy_price).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm h-11">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all border-r border-slate-100"
                            >
                                <Minus size={14} />
                            </button>
                            <input 
                                type="number" 
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="w-12 text-center font-bold text-slate-900 border-none focus:ring-0 text-[14px] bg-transparent p-0"
                            />
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all border-l border-slate-100"
                            >
                                <Plus size={14} />
                            </button>
                        </div>

                        <button 
                            disabled={processing}
                            onClick={handleAddToCart}
                            className="flex-1 sm:flex-none h-11 pl-6 pr-4 bg-[#FF9F43] text-white rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-between gap-6 hover:bg-[#e68a30] transition-all active:scale-95 shadow-lg shadow-[#FF9F43]/20 group"
                        >
                            <span>Add to Cart</span>
                            <ShoppingCart size={15} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
