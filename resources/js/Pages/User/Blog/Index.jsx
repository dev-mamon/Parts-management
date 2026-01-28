import React, { useState, useEffect } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, router } from "@inertiajs/react";
import { 
    Search, 
    Calendar, 
    Clock,
    ArrowRight,
    BookOpen,
    Loader2
} from "lucide-react";

export default function Index({ blogs, filters }) {
    const [allBlogs, setAllBlogs] = useState(blogs.data);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Update allBlogs when search results change
    useEffect(() => {
        if (filters.search) {
            setAllBlogs(blogs.data);
        } else if (blogs.current_page === 1) {
            setAllBlogs(blogs.data);
        }
    }, [blogs.data, filters.search]);

    const featuredBlog = allBlogs[0];
    const remainingBlogs = allBlogs.slice(1);

    const handleSearch = (e) => {
        const query = e.target.value;
        router.get(
            route("blogs.index"),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    const loadMore = () => {
        if (blogs.next_page_url && !isLoadingMore) {
            setIsLoadingMore(true);
            router.get(
                blogs.next_page_url,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['blogs'],
                    onSuccess: (page) => {
                        setAllBlogs(prev => [...prev, ...page.props.blogs.data]);
                        setIsLoadingMore(false);
                    },
                }
            );
        }
    };

    return (
        <UserLayout>
            <Head title="Our Blog" />

            <div className="bg-[#F8FAFC] min-h-screen py-8 md:py-12">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                            Latest <span className="text-[#AD0100]">Insights</span>
                        </h1>
                        <div className="relative group w-full md:w-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#AD0100] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                defaultValue={filters.search}
                                onChange={handleSearch}
                                className="w-full md:w-80 pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#AD0100] focus:border-[#AD0100] transition-all shadow-sm text-sm"
                            />
                        </div>
                    </div>

                    {/* Featured Article Card */}
                    {featuredBlog && !filters.search && (
                        <div className="mb-12 bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm ">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 aspect-[16/10] lg:aspect-auto">
                                    {featuredBlog.image_url ? (
                                        <img 
                                            src={featuredBlog.image_url} 
                                            alt={featuredBlog.title}
                                            className="w-full h-full object-cover" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                            <BookOpen size={48} />
                                        </div>
                                    )}
                                </div>
                                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                    <div className="mb-6">
                                        <span className="px-4 py-1.5 bg-[#FFF9E5] text-[#D4A017] text-[10px] font-black uppercase tracking-widest rounded-lg">
                                            Featured Article
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight hover:text-[#AD0100] transition-colors line-clamp-2">
                                        <Link href={route("blogs.show", featuredBlog.id)}>
                                            {featuredBlog.title}
                                        </Link>
                                    </h2>
                                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 line-clamp-3 font-medium">
                                        {featuredBlog.content.replace(/<[^>]*>?/gm, '').substring(0, 200)}...
                                    </p>
                                    <div className="flex items-center gap-6 mb-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={14} className="text-[#D4A017]" />
                                            {featuredBlog.created_at}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Clock size={14} className="text-[#D4A017]" />
                                            5 min read
                                        </span>
                                    </div>
                                    <Link 
                                        href={route("blogs.show", featuredBlog.id)}
                                        className="inline-flex items-center gap-2 text-sm font-black text-[#AD0100] hover:gap-3 transition-all"
                                    >
                                        Read More <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {(filters.search ? allBlogs : remainingBlogs).map((blog) => (
                            <article key={blog.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm ">
                                <Link href={route("blogs.show", blog.id)} className="block aspect-[16/10] overflow-hidden">
                                    {blog.image_url ? (
                                        <img 
                                            src={blog.image_url} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                            <BookOpen size={32} />
                                        </div>
                                    )}
                                </Link>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-md">
                                            Industry Insights
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 mb-3 hover:text-[#AD0100] transition-colors line-clamp-2 leading-snug">
                                        <Link href={route("blogs.show", blog.id)}>
                                            {blog.title}
                                        </Link>
                                    </h3>
                                    <p className="text-slate-500 text-[13px] leading-relaxed mb-6 line-clamp-3 font-medium">
                                        {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                                    </p>
                                    <div className="flex items-center gap-4 mb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5 text-[#AD0100]/60">
                                            <Calendar size={12} />
                                            {blog.created_at}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-[#AD0100]/60">
                                            <Clock size={12} />
                                            5 min read
                                        </span>
                                    </div>
                                    <Link 
                                        href={route("blogs.show", blog.id)}
                                        className="inline-flex items-center gap-1.5 text-xs font-black text-[#AD0100] hover:gap-2 transition-all uppercase tracking-wider"
                                    >
                                        Read More <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {allBlogs.length === 0 && (
                        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100/50 shadow-sm">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen size={32} className="text-slate-200" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">No articles found</h3>
                            <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">Try refining your search terms.</p>
                        </div>
                    )}

                    {/* Load More Button */}
                    {blogs.next_page_url && (
                        <div className="flex justify-center mt-12 pb-12">
                            <button
                                onClick={loadMore}
                                disabled={isLoadingMore}
                                className="flex items-center gap-3 px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-black text-sm hover:bg-slate-50 hover:border-[#AD0100] hover:text-[#AD0100] transition-all shadow-sm active:scale-95 disabled:opacity-50"
                            >
                                {isLoadingMore ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Loading Insights...
                                    </>
                                ) : (
                                    "Load More Insights"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
