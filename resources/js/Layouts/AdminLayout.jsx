import React, { useState } from "react";
import Header from "../Components/Navigation/Admin/Header";
import Sidebar from "../Components/Navigation/Admin/Sidebar";
import { ChevronLeft, Menu } from "lucide-react";

export default function AdminLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Sidebar expands if not manually collapsed OR if the user hovers over the mini-bar
    const showFullSidebar = !isCollapsed || isHovered;

    return (
        <div className="flex h-screen bg-[#F7F7F7] overflow-hidden font-sans">
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[55] lg:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                onMouseEnter={() => isCollapsed && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`fixed inset-y-0 left-0 z-[60] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
                    ${
                        isMobileOpen
                            ? "translate-x-0 w-64 shadow-2xl"
                            : "-translate-x-full lg:translate-x-0"
                    }
                    ${showFullSidebar ? "lg:w-64" : "lg:w-20"}`}
            >
                {/* Desktop Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-5 z-[70] w-6 h-6 bg-orange-500 text-white rounded-full items-center justify-center shadow-md hover:bg-orange-600 transition-all"
                >
                    <ChevronLeft
                        size={14}
                        className={`${
                            isCollapsed ? "rotate-180" : ""
                        } transition-transform duration-300`}
                    />
                </button>

                {/* The Sidebar Component */}
                <Sidebar
                    isCollapsed={!showFullSidebar}
                    isMobileOpen={isMobileOpen}
                    setIsMobileOpen={setIsMobileOpen}
                />
            </aside>

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
                    showFullSidebar ? "lg:pl-64" : "lg:pl-20"
                }`}
            >
                <div className="flex items-center bg-white border-b border-gray-100 lg:border-none w-full shrink-0">
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="p-4 lg:hidden text-gray-600 hover:text-orange-500 transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex-1">
                        <Header />
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto bg-[#F9FAFB] p-4 lg:p-6">
                    <div className="w-full mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
