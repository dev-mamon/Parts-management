import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    Search,
    Settings,
    Heart,
    Bookmark,
    ClipboardCheck,
    History,
    RotateCcw,
    BookOpen,
    Headset,
    FileText,
    ShieldCheck,
    LogOut,
} from "lucide-react";

const MENU = [
    {
        title: "MAIN",
        items: [
            { label: "Dashboard", icon: LayoutDashboard, path: route('dashboard') },
            { label: "Parts", icon: Search, path: route('parts.index') },
        ],
    },
    {
        title: "SHOPPING",
        items: [
            { label: "Favourites", icon: Heart, path: route('favourites.index') },
            { label: "Saved Quotes", icon: Bookmark, path: route('quotes.index') },
        ],
    },
    {
        title: "ORDERS",
        items: [
            {
                label: "Active Orders",
                icon: ClipboardCheck,
                path: route('orders.active'),
            },
            { label: "Order History", icon: History, path: route('orders.history') },
            { label: "Return History", icon: RotateCcw, path: route('user.returns.index') },
        ],
    },
    {
        title: "SUPPORT",
        items: [
            { label: "Blog", icon: BookOpen, path: "/blogs" },
            { label: "Contact Us", icon: Headset, path: route('contact.index') },
            { label: "Profile Settings", icon: Settings, path: route('settings.index') },
        ],
    },
  
    {
        title: "LEGAL",
        items: [
            { label: "Terms & Service", icon: FileText, path: route('terms.index') },
            { label: "Privacy Policy", icon: ShieldCheck, path: route('privacy.index') },
            { label: "Return Policy", icon: RotateCcw, path: route('return-policy.index') },
        ],
    },
];

export default function Sidebar({ isCollapsed }) {
    const { url } = usePage();

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <aside
            className={`flex flex-col pt-4 h-full bg-white border-r transition-all duration-300 pl-4 ${
                isCollapsed ? "w-[80px]" : "w-[280px]"
            }`}
        >
            {/* Logo Section - Reduced padding from py-5 to py-4 */}
            <div
                className={`flex items-center py-2 lg:py-4 ${
                    isCollapsed ? "justify-center" : "pl-8 pr-4"
                }`}
            >
                <img
                    src="img/logo.png"
                    alt="Logo"
                    className={`transition-all duration-300 ${
                        isCollapsed ? "h-5 lg:h-6" : "h-7 lg:h-9"
                    }`}
                />
            </div>

            {/* Navigation - Ultra Compact Vertical List */}
            <nav className="flex-1 pr-4 mt-2 space-y-2 overflow-y-auto custom-scrollbar">
                {MENU.map((group) => (
                    <div key={group.title} className="space-y-0.5">
                        {!isCollapsed && (
                            /* Group Title - Muted and subtle */
                            <p className="pl-4 mb-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] opacity-80 mt-2 first:mt-0">
                                {group.title}
                            </p>
                        )}

                        {/* Items Container - Tight list */}
                        <div className="space-y-0.5">
                            {group.items.map(({ label, icon: Icon, path }) => {
                                const currentPath = url.split('?')[0];
                                
                                // Robust active route detection
                                let isActive = false;
                                try {
                                    const targetPath = path.startsWith('http') ? new URL(path).pathname : path;
                                    isActive = currentPath === targetPath;
                                } catch (e) {
                                    isActive = currentPath === path;
                                }

                                return (
                                    <Link
                                        key={label}
                                        href={path}
                                        className={`
                                            group flex items-center transition-all duration-300 relative
                                            ${
                                                isCollapsed
                                                    ? "justify-center px-1"
                                                    : "gap-2.5 pl-4 pr-4"
                                            }
                                            py-2
                                            rounded-[16px]
                                            ${
                                                isActive
                                                    ? "bg-[#AD0100]/10 text-[#AD0100] font-bold border-l-[4px] border-[#AD0100]"
                                                    : "text-slate-600 hover:text-[#AD0100] hover:bg-slate-50 border-l-[4px] border-transparent"
                                            }
                                        `}
                                    >
                                        <Icon
                                            className={`${isActive ? 'text-[#AD0100]' : 'text-slate-400'} w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110`}
                                            strokeWidth={isActive ? 2.5 : 2}
                                        />

                                        {!isCollapsed && (
                                            <span className="text-[14px] tracking-tight">
                                                {label}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Logout - Compact version */}
                <div className="pt-2 border-t border-slate-50 mt-2 pb-4">
                    <button 
                        onClick={handleLogout}
                        className="group flex items-center gap-2.5 pl-4 pr-4 py-2 w-full text-red-500 font-bold hover:bg-red-50 rounded-[16px] transition-all duration-300"
                    >
                        <LogOut
                            className="w-[18px] h-[18px] transition-transform duration-200"
                        />
                        {!isCollapsed && (
                            <span className="text-[14px] tracking-tight">Log Out</span>
                        )}
                    </button>
                </div>
            </nav>
        </aside>
    );
}
