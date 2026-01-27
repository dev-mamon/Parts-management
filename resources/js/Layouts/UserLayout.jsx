import React, { useState } from "react";
import Header from "../Components/Navigation/User/Header";
import Sidebar from "../Components/Navigation/User/Sidebar";
import CartDrawer from "../Components/ui/user/CartDrawer";
import { Menu, X } from "lucide-react";

export default function UserLayout({ children }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F9F9F9] font-sans">
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[55] lg:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Section - Synchronized with Sidebar.jsx width (280px) */}
            <aside
                className={`fixed inset-y-0 left-0 z-[60] transition-all duration-300 ease-in-out flex flex-col w-[280px] bg-white
                    ${
                        isMobileOpen
                            ? "translate-x-0 shadow-2xl"
                            : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Mobile Close Button - Refined positioning */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden absolute right-4 top-6 p-2 text-slate-400 hover:text-red-600 bg-slate-50 rounded-xl transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Sidebar Navigation Items */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <Sidebar isCollapsed={false} />
                </div>
            </aside>

            {/* Main Content Area - Matching sidebar width padding */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px]">
                <div className="sticky top-0 z-[50] flex items-center bg-white w-full shrink-0">
                    <div className="flex-1">
                        {/* Unified onMenuClick handler */}
                        <Header 
                            onMenuClick={() => setIsMobileOpen(true)} 
                            onCartClick={() => setIsCartOpen(true)}
                        />
                    </div>
                </div>

                <main className="flex-1 p-0">
                    <div className="w-full min-w-0">
                        {children}
                    </div>
                </main>
            </div>

            {/* Global Shopping Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}
