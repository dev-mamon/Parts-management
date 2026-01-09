import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    ShoppingCart,
    RefreshCw,
    Users,
    Tag,
    FileText,
    BarChart2,
    ChevronRight,
    ChevronDown,
    X,
} from "lucide-react";

const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const { url } = usePage();

    // Track which menus with children are open
    const [openMenus, setOpenMenus] = useState({ products: false });

    const toggleMenu = (key) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Menu configuration
    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        { label: "Orders", path: "/orders", icon: <ShoppingCart size={20} /> },
        {
            label: "Categories",
            path: "/categories",
            icon: <ShoppingCart size={20} />,
        },
        { label: "Returns", path: "/returns", icon: <RefreshCw size={20} /> },
        { label: "All leads", path: "/leads", icon: <Users size={20} /> },
        {
            label: "Sales - B2C",
            path: "/sales-b2c",
            icon: <BarChart2 size={20} />,
        },
        {
            label: "Customers - B2B",
            path: "/customers-b2b",
            icon: <Users size={20} />,
        },
        {
            label: "Products",
            path: "/products",
            icon: <Tag size={20} />,
            children: [
                { label: "All Products", path: "/products" },
                { label: "Add Product", path: "/products/create" },
            ],
            key: "products",
        },
        {
            label: "Create Invoice",
            path: "/invoice/create",
            icon: <FileText size={20} />,
        },
        {
            label: "Analytics",
            path: "/analytics",
            icon: <BarChart2 size={20} />,
        },
    ];

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Logo Section */}
            <div
                className={`flex items-center h-20 shrink-0 transition-all duration-300 ${
                    isCollapsed ? "justify-center" : "px-6"
                }`}
            >
                <img
                    src="/img/logo.png"
                    alt="Logo"
                    className={`transition-all duration-300 object-contain ${
                        isCollapsed ? "h-8 w-8" : "h-10"
                    }`}
                />
                {isMobileOpen && (
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden ml-auto p-2 text-gray-400"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-4 custom-sidebar-scrollbar">
                {!isCollapsed && (
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-3">
                        Main Menu
                    </p>
                )}

                <div className="space-y-1">
                    {menuItems.map((item) =>
                        item.children ? (
                            <SidebarItem
                                key={item.key}
                                icon={item.icon}
                                label={item.label}
                                path={item.path}
                                isCollapsed={isCollapsed}
                                hasChild
                                isOpen={openMenus[item.key]}
                                onClick={() => toggleMenu(item.key)}
                            >
                                {!isCollapsed &&
                                    item.children.map((child) => (
                                        <Link
                                            key={child.path}
                                            href={child.path}
                                            className={`block pl-10 py-2 rounded-lg text-sm ${
                                                url === child.path
                                                    ? "bg-orange-50 text-orange-600"
                                                    : "text-slate-600 hover:bg-gray-50 hover:text-orange-600"
                                            }`}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                            </SidebarItem>
                        ) : (
                            <SidebarItem
                                key={item.path}
                                icon={item.icon}
                                label={item.label}
                                path={item.path}
                                active={url.startsWith(item.path)}
                                isCollapsed={isCollapsed}
                            />
                        )
                    )}
                </div>
            </nav>
        </div>
    );
};

const SidebarItem = ({
    icon,
    label,
    path,
    active,
    isCollapsed,
    hasChild,
    isOpen,
    onClick,
    children,
}) => {
    const classes = `flex items-center ${
        isCollapsed ? "justify-center" : "gap-3 px-3"
    } py-2.5 rounded-xl transition-all duration-200 group relative ${
        active
            ? "bg-orange-50 text-orange-600"
            : "text-slate-600 hover:bg-gray-50 hover:text-orange-600"
    } cursor-pointer`;

    const content = (
        <>
            <div
                className={`shrink-0 transition-colors ${
                    active ? "text-orange-600" : "group-hover:text-orange-600"
                }`}
            >
                {icon}
            </div>
            {!isCollapsed && (
                <span className="text-[14px] font-medium">{label}</span>
            )}

            {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] whitespace-nowrap">
                    {label}
                </div>
            )}

            {hasChild && !isCollapsed && (
                <div className="ml-auto">
                    {isOpen ? (
                        <ChevronDown size={14} />
                    ) : (
                        <ChevronRight size={14} />
                    )}
                </div>
            )}
        </>
    );

    if (hasChild && !isCollapsed) {
        return (
            <div>
                <div onClick={onClick} className={classes}>
                    {content}
                </div>
                {isOpen && children}
            </div>
        );
    }

    return (
        <Link href={path} className={classes}>
            {content}
        </Link>
    );
};

export default Sidebar;
