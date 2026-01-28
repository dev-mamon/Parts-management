import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    Calendar, 
    User, 
    ChevronLeft, 
    Clock, 
    ArrowRight,
    Share2,
    MessageSquare,
    Facebook,
    Twitter,
    Linkedin,
    Hash,
    BookOpen
} from "lucide-react";

export default function Show({ blog, relatedBlogs }) {
    return (
        <UserLayout>
            <Head title={`${blog.title} - Lee Parts Blog`} />

            <div className="bg-[#F8FAFC] min-h-screen pb-20">
                {/* Hero Section / Article Header */}
                <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                    {blog.image_url ? (
                        <img 
                            src={blog.image_url} 
                            alt={blog.title} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                            <BookOpen size={80} className="text-slate-800" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                        <div className="max-w-4xl mx-auto">
                            <Link 
                                href={route("blogs.index")}
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-bold transition-colors group"
                            >
                                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Blog
                            </Link>
                            
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20">
                                    {blog.category || "General"}
                                </span>
                                <div className="flex items-center gap-4 text-white/80 text-[11px] font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                        <Calendar size={14} className="text-red-400" />
                                        {blog.formatted_date}
                                    </span>
                                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                                        <User size={14} className="text-red-400" />
                                        {blog.author}
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                {blog.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Article Section */}
                        <div className="lg:col-span-8">
                            <article className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm shadow-slate-200/50">
                                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-red-600 prose-strong:text-slate-900">
                                    {/* Using dangerouslySetInnerHTML if the content is HTML from an editor, 
                                        otherwise plain text split into paragraphs */}
                                    {blog.content.split('\n').map((para, i) => (
                                        para.trim() && <p key={i}>{para}</p>
                                    ))}
                                </div>

                                {/* Article Footer - Share & Interactions */}
                                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Share this Article</span>
                                        <div className="flex items-center gap-2">
                                            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                                                <button key={i} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                                                    <Icon size={18} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors text-sm font-bold">
                                            <MessageSquare size={18} />
                                            <span>Comments</span>
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors text-sm font-bold">
                                            <Share2 size={18} />
                                            <span>Copy Link</span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Sidebar: Related Posts & Meta */}
                        <aside className="lg:col-span-4 space-y-8">
                            {/* Author Card (Simple) */}
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm shadow-slate-200/50">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <User size={16} className="text-red-600" />
                                    About the Author
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{blog.author}</h4>
                                        <p className="text-xs text-slate-400 font-medium">Auto Parts Specialist</p>
                                    </div>
                                </div>
                            </div>

                            {/* Related Posts */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest px-2 flex items-center gap-2">
                                    <BookOpen size={16} className="text-red-600" />
                                    Related Articles
                                </h3>
                                
                                <div className="space-y-4">
                                    {relatedBlogs.map((related) => (
                                        <Link 
                                            key={related.id} 
                                            href={route("blogs.show", related.id)}
                                            className="group flex gap-4 p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all duration-300 shadow-sm shadow-slate-200/50"
                                        >
                                            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                                                <img 
                                                    src={related.image_url} 
                                                    alt={related.title} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center min-w-0">
                                                <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                                                    {related.title}
                                                </h4>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                                                    {related.created_at}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Tags or Other info */}
                            <div className="bg-red-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <Hash size={120} />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight mb-2 relative z-10">Looking for Parts?</h3>
                                <p className="text-white/80 text-sm mb-6 relative z-10 leading-relaxed">
                                    Search our catalog for over 100,000+ premium automotive and industrial parts.
                                </p>
                                <Link 
                                    href={route("parts.index")}
                                    className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors relative z-10"
                                >
                                    Shop Catalog
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
