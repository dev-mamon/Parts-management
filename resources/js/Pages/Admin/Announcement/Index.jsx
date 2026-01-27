import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { 
    Upload, 
    Trash2, 
    Plus, 
    CheckCircle2, 
    XCircle, 
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";

export default function Index({ announcements }) {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.announcements.store"), {
            onSuccess: () => {
                reset();
                setPreview(null);
            },
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This announcement will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#A80000",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.announcements.destroy", id));
            }
        });
    };

    const toggleStatus = (id) => {
        router.patch(route("admin.announcements.update-status", id));
    };

    return (
        <AdminLayout>
            <Head title="Banner Management" />

            <div className="p-6 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                            Announcement Banners
                        </h1>
                        <p className="text-sm text-slate-500 font-medium">
                            Manage promotional banners for the user dashboard.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 1. Upload Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Plus size={18} className="text-[#A80000]" />
                                    Create New Banner
                                </h3>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                        Banner Title (Optional)
                                    </label>
                                    <input 
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData("title", e.target.value)}
                                        placeholder="e.g. Christmas Sale 2024"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A80000]/20 focus:border-[#A80000] transition-all font-medium"
                                    />
                                    {errors.title && <p className="mt-1 text-xs text-red-600 font-bold">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                        Banner Image
                                    </label>
                                    <div 
                                        onClick={() => document.getElementById('banner-upload').click()}
                                        className={cn(
                                            "relative aspect-[16/9] bg-slate-50 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group",
                                            preview ? "border-[#A80000]" : "border-slate-200 hover:border-[#A80000]/50 hover:bg-slate-100/50"
                                        )}
                                    >
                                        {preview ? (
                                            <>
                                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-xs font-bold uppercase tracking-widest">Change Image</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                                                    <Upload size={24} className="text-slate-400" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center px-4">
                                                    Click to upload <br /> (16:9 recommended)
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <input 
                                        id="banner-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    {errors.image && <p className="mt-1 text-xs text-red-600 font-bold">{errors.image}</p>}
                                </div>

                                <button 
                                    type="submit"
                                    disabled={processing || !data.image}
                                    className="w-full py-4 bg-[#A80000] text-white rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-red-900/20 hover:bg-[#8B0000] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <Plus size={18} strokeWidth={3} />
                                    )}
                                    Publish Banner
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* 2. List Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <ImageIcon size={18} className="text-[#A80000]" />
                                    Active Banners ({announcements.filter(a => a.is_active).length})
                                </h3>
                            </div>

                            <div className="p-6">
                                {announcements.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {announcements.map((item) => (
                                            <div 
                                                key={item.id}
                                                className={cn(
                                                    "group relative bg-slate-50 border rounded-2xl overflow-hidden transition-all duration-300",
                                                    item.is_active ? "border-[#A80000]/10 shadow-sm" : "border-slate-200 grayscale opacity-60"
                                                )}
                                            >
                                                {/* Image */}
                                                <div className="aspect-[16/9] relative overflow-hidden">
                                                    <img 
                                                        src={item.image_path} 
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        alt={item.title} 
                                                    />
                                                    <div className="absolute top-3 right-3 flex gap-2">
                                                        <button 
                                                            onClick={() => toggleStatus(item.id)}
                                                            className={cn(
                                                                "p-2 rounded-lg shadow-lg backdrop-blur-md transition-all",
                                                                item.is_active ? "bg-green-500/90 text-white" : "bg-slate-500/90 text-white"
                                                            )}
                                                            title={item.is_active ? "Active" : "Inactive"}
                                                        >
                                                            {item.is_active ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 bg-white/90 text-red-600 rounded-lg shadow-lg backdrop-blur-md hover:bg-red-600 hover:text-white transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Details */}
                                                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 leading-none">
                                                            {item.title || "Untitled Banner"}
                                                        </h4>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                                                            Uploaded {new Date(item.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                            <ImageIcon size={32} className="text-slate-300" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 uppercase tracking-tight">No Banners Found</h4>
                                        <p className="text-xs text-slate-500 font-medium max-w-xs mt-1">
                                            Start by uploading your first promotional banner to show on the user dashboard.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
