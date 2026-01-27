import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, usePage, router } from "@inertiajs/react";
import {
    Search,
    Star,
    ShoppingCart,
    ChevronDown,
    Plus,
    Minus,
    ImageOff,
    XCircle,
    Info,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { debounce } from "lodash";
import ProductDetailsModal from "@/Components/ui/user/ProductDetailsModal";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const SearchInput = memo(({ initialValue, onSearch }) => {
    const [localValue, setLocalValue] = useState(initialValue || "");

    useEffect(() => {
        setLocalValue(initialValue || "");
    }, [initialValue]);

    const handleChange = (e) => {
        const val = e.target.value;
        setLocalValue(val);
        onSearch(val);
    };

    return (
        <div className="relative flex-1 min-w-full sm:min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A80000] w-5 h-5 pointer-events-none" />
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder="Search description or SKU..."
                className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 shadow-sm focus:ring-4 focus:ring-[#A80000]/10 focus:border-[#A80000] bg-white outline-none transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
            />
            {localValue && (
                <button
                    onClick={() => {
                        setLocalValue("");
                        onSearch("");
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors"
                >
                    <XCircle className="w-5 h-5" />
                </button>
            )}
        </div>
    );
});

const FilterDropdown = memo(
    ({ label, filterKey, options, currentValue, onFilter }) => {
        return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="bg-white px-5 py-3 rounded-full shadow-sm flex items-center gap-3 min-w-[140px] justify-between border border-slate-200 hover:border-[#A80000]/30 hover:bg-slate-50/50 outline-none focus:outline-none focus:ring-0 group select-none">
                    <span className={cn("text-xs font-bold truncate max-w-[100px] uppercase tracking-wide", currentValue ? "text-[#A80000]" : "text-slate-600 group-hover:text-slate-900")}>
                        {currentValue || label}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-[#A80000] transition-colors" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    className="min-w-max w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-slate-100 rounded-2xl shadow-xl max-h-80 overflow-y-auto z-[100] p-1.5 outline-none focus:outline-none focus:ring-0"
                    align="start"
                >
                    <DropdownMenuItem
                        className="font-bold text-red-500 focus:bg-red-50 focus:outline-none cursor-pointer rounded-xl py-2 px-3 text-xs uppercase"
                        onClick={() => onFilter(filterKey, "")}
                    >
                        All {label}s
                    </DropdownMenuItem>
                    {options.map((opt) => (
                        <DropdownMenuItem
                            key={opt}
                            onClick={() => onFilter(filterKey, opt)}
                            className="focus:bg-slate-50 focus:outline-none cursor-pointer rounded-xl py-2 px-3 text-xs font-semibold text-slate-700 capitalize"
                        >
                            {opt}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    },
);

const ProductRow = memo(
    ({
        product,
        quantity,
        styles,
        onToggleFavorite,
        onQuantityChange,
        onAddToCart,
        onImageClick,
    }) => {
        const firstImage = product.files?.[0] || null;

        // Dynamic Badge Styling
        const categoryName = product.subCategory?.name?.toUpperCase() || "";
        const isOEM = categoryName.includes("OEM");
        const isAftermarket = categoryName.includes("AFTERMARKET");

        const badgeStyle = isOEM
            ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(79,70,229,0.3)]"
            : isAftermarket
              ? "bg-cyan-600 text-white shadow-[0_0_12px_rgba(8,145,178,0.3)]"
              : "bg-slate-500 text-white shadow-sm";

        return (
            <tr
                className={cn(
                    styles.rowHover,
                    styles.accent,
                    "transition-all group odd:bg-white even:bg-slate-50/50 h-[90px] border-b border-slate-50"
                )}
            >
                <td className="py-2 pl-4">
                    <div className="flex gap-3 items-center">
                        {/* Vertical Badge - Fixed Overflow for Long Names */}
                        <div
                            className={cn(
                                "h-[76px] w-8 flex items-center justify-center rounded-full shrink-0 transition-all duration-300 group-hover:scale-105 overflow-hidden",
                                badgeStyle
                            )}
                        >
                            <span className="text-[7.5px] font-black [writing-mode:vertical-lr] rotate-180 tracking-[0.05em] uppercase leading-none text-center">
                                {categoryName || "PART"}
                            </span>
                        </div>

                        {/* Image Container */}
                        <div 
                            onClick={() => onImageClick(product)}
                            className="w-24 h-16 rounded-2xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm relative group-hover:border-[#A80000]/40 cursor-pointer transition-all active:scale-95"
                        >
                            {firstImage ? (
                                <img
                                    src={`/${firstImage.file_path}`}
                                    alt={product.description}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <ImageOff className="w-6 h-6 text-slate-200" />
                            )}
                        </div>

                        {/* Favorite Star */}
                        <button
                            onClick={() => onToggleFavorite(product.id)}
                            className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all shrink-0 hover:scale-110 active:scale-95",
                                product.is_favorite
                                    ? "bg-amber-50 shadow-sm"
                                    : "bg-slate-50 hover:bg-amber-50"
                            )}
                        >
                            <Star
                                className={cn(
                                    "w-4 h-4 transition-all",
                                    product.is_favorite
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-slate-300 group-hover:text-slate-400"
                                )}
                            />
                        </button>
                    </div>
                 </td>
                <td className="px-6 py-2">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-bold text-slate-800 text-[14px] line-clamp-1 leading-tight tracking-tight uppercase">
                            {product.description}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                            {product.fitments?.[0]
                                ? `${product.fitments[0].year_from}-${product.fitments[0].year_to} ${product.fitments[0].make} ${product.fitments[0].model}`
                                : "General Fitment"}
                        </p>
                    </div>
                </td>
                <td className="px-2 py-2 text-[13px] font-bold text-slate-700 text-center uppercase tracking-tighter whitespace-nowrap">
                    {product.location_id || <span className="text-slate-300">—</span>}
                </td>
                <td className="px-2 py-2 text-[12px] font-mono font-bold text-slate-500 text-center group-hover:text-slate-900 transition-colors whitespace-nowrap">
                    {product.sku || <span className="text-slate-200">—</span>}
                </td>
                <td className="px-2 py-2 text-center text-[12px] font-bold text-slate-400 tracking-tighter line-through whitespace-nowrap">
                    ${product.buy_price || "0.00"}
                </td>
                <td className="px-2 py-2 text-center text-[15px] font-black text-slate-900 tracking-tight whitespace-nowrap">
                    ${product.list_price || "0.00"}
                </td>
                <td className="px-6 py-2">
                    <div className="flex items-center gap-2 justify-end">
                        <div className="flex items-center bg-slate-100/80 border border-slate-200/60 rounded-xl p-1">
                            <button
                                onClick={() => onQuantityChange(product.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-slate-200 shadow-sm text-slate-400 hover:text-red-500 transition-all active:scale-90 disabled:opacity-50"
                                disabled={quantity <= 1}
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-10 text-center text-[14px] font-black text-slate-700">
                                {quantity}
                            </span>
                            <button
                                onClick={() => onQuantityChange(product.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-slate-200 shadow-sm text-slate-400 hover:text-[#A80000] transition-all active:scale-90"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <button
                            onClick={() => onAddToCart(product.id)}
                            className={cn(
                                "p-3 rounded-xl text-white shadow-lg transition-all active:scale-90 flex items-center justify-center gap-2",
                                product.in_cart
                                    ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                                    : "bg-[#A80000] hover:bg-[#8B0000] shadow-[#A80000]/20"
                            )}
                        >
                            <ShoppingCart className={cn("w-5 h-5", product.in_cart ? "fill-white" : "fill-none")} />
                        </button>
                    </div>
                </td>
            </tr>
        );
    },
);

export default function Index() {
    const { auth, products, categories, filters, filterOptions } =
        usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [quantities, setQuantities] = useState(() =>
        Object.fromEntries(products.map((p) => [p.id, 1])),
    );

    // Modal State
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = useCallback((product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const hasActiveFilters = useMemo(() => {
        return Object.entries(filters).some(
            ([key, value]) =>
                value !== null && value !== "" && value !== undefined,
        );
    }, [filters]);

    const isSearchActive = useMemo(() => {
        const hasSearchTerm = filters.search && filters.search.trim() !== "";
        const hasFullFitment = filters.year_from && filters.make && filters.model;
        
        return !!(hasSearchTerm || hasFullFitment);
    }, [filters]);

    const debouncedSearch = useMemo(
        () =>
            debounce((value) => {
                setIsLoading(true);
                router.get(
                    route("parts.index"),
                    { ...filters, search: value },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                        onFinish: () => setIsLoading(false),
                    },
                );
            }, 300),
        [filters],
    );

    const applyFilter = useCallback(
        (key, value) => {
            if (filters[key] === value) return;
            
            const nextFilters = { ...filters, [key]: value };
            const isPrimarySearchSelected = (nextFilters.search && nextFilters.search.trim() !== "") || 
                                           (nextFilters.year_from && nextFilters.make && nextFilters.model);

        
            setIsLoading(true);
            router.get(
                route("parts.index"),
                nextFilters,
                {
                    preserveState: true,
                    preserveScroll: true,
                    onFinish: () => setIsLoading(false),
                },
            );
        },
        [filters],
    );

    const clearAllFilters = () => {
        setIsLoading(true);
        router.get(
            route("parts.index"),
            {},
            {
                preserveState: false,
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const handleQuantityChange = useCallback((id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta),
        }));
    }, []);

    const handleToggleFavorite = (productId) => {
        router.post(
            route("parts.favourite"),
            { product_id: productId },
            { 
                preserveScroll: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            },
        );
    };


    const handleAddToCart = (productId) => {
        router.post(
            route("parts.to-cart"),
            { product_id: productId, quantity: quantities[productId] || 1 },
            { 
                preserveScroll: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            },
        );
    };

    const getSubCategoryStyles = (subCatName) => {
        const name = subCatName?.toUpperCase() || "";
        if (name.includes("OEM"))
            return {
                rowHover: "hover:bg-indigo-50/10",
                accent: "border-l-4 border-l-indigo-600/40",
            };
        if (name.includes("AFTERMARKET"))
            return {
                rowHover: "hover:bg-cyan-50/10",
                accent: "border-l-4 border-l-cyan-600/40",
            };
        return {
            rowHover: "hover:bg-slate-50/50",
            accent: "border-l-4 border-l-slate-400/40",
        };
    };

    const filterConfigs = useMemo(
        () => [
            {
                label: "Category",
                key: "category",
                options: categories?.map((c) => c.name) || [],
            },
            {
                label: "Year",
                key: "year_from",
                options: filterOptions?.years || [],
            },
            { label: "Make", key: "make", options: filterOptions?.makes || [] },
            {
                label: "Model",
                key: "model",
                options: filterOptions?.models || [],
            },
            {
                label: "Location",
                key: "location",
                options: filterOptions?.locations || [],
            },
        ],
        [categories, filterOptions],
    );

    return (
        <UserLayout user={auth.user}>
            <Head title="Shop Parts" />
            <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen font-sans">
                {/* Header Title */}
                <div className="mb-6 md:mb-10 text-center md:text-left">
                    <h1 className="text-xl md:text-4xl font-black text-slate-900 tracking-tight">Shop Parts</h1>
                    <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">Browse and order thousands of high-quality auto parts.</p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col xl:flex-row gap-4 mb-8">
                    <SearchInput
                        initialValue={filters.search}
                        onSearch={debouncedSearch}
                    />
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3 w-full sm:w-auto">
                            {filterConfigs.map((f) => (
                                <FilterDropdown
                                    key={f.key}
                                    label={f.label}
                                    filterKey={f.key}
                                    options={f.options}
                                    currentValue={filters[f.key]}
                                    onFilter={applyFilter}
                                />
                            ))}
                        </div>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 font-bold text-[10px] md:text-xs uppercase tracking-widest border border-red-100 transition-all active:scale-95 shadow-sm w-full sm:w-auto"
                            >
                                <XCircle className="w-4 h-4" /> Reset Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Table Section - Enhanced Mobile Scroll */}
                <div className="bg-white rounded-[12px] md:rounded-[16px] shadow-xl shadow-slate-200/40 border border-slate-200/60 relative mb-10">
                    {/* Linear Progress Bar */}
                    {isLoading && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#A80000]/10 overflow-hidden z-20 rounded-t-[12px] md:rounded-t-[16px]">
                            <div className="h-full bg-[#A80000] animate-progress-indeterminate w-1/3 rounded-full shadow-[0_0_8px_rgba(168,0,0,0.5)]" />
                        </div>
                    )}

                    {!isSearchActive ? (
                        <div className="py-20 md:py-32 px-6 text-center">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-50 rounded-full flex items-center justify-center text-[#A80000]">
                                    <Info className="w-8 h-8 md:w-10 md:h-10" />
                                </div>
                                <div className="flex flex-col gap-1 max-w-sm mx-auto">
                                    <p className="text-slate-900 font-black text-base md:text-lg uppercase tracking-tight">Search for Parts</p>
                                    <p className="text-slate-400 text-xs md:text-sm font-medium">Please enter a search term or select <strong>Year, Make, and Model</strong> to view products.</p>
                                </div>
                            </div>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="w-full -mx-0 overflow-hidden">
                            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent pb-4 touch-pan-x">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-slate-50/50 text-[10px] md:text-[11px] font-black uppercase tracking-[0.12em] text-slate-500 border-b border-slate-100 italic">
                                            <th className="px-5 py-6 w-[220px]">Item View</th>
                                            <th className="px-5 py-6 min-w-[300px]">Product Description</th>
                                            <th className="px-2 py-6 text-center w-[120px]">Location</th>
                                            <th className="px-2 py-6 text-center w-[120px]">SKU</th>
                                            <th className="px-2 py-6 text-center w-[100px]">List</th>
                                            <th className="px-2 py-6 text-center w-[120px]">Your Price</th>
                                            <th className="px-5 py-6 w-[180px]"></th>
                                        </tr>
                                    </thead>
                                <tbody className={cn("divide-y divide-slate-100 transition-all duration-500", isLoading ? "opacity-40 grayscale-[0.3] pointer-events-none" : "opacity-100")}>
                                    {products.map((product) => (
                                        <ProductRow
                                            key={product.id}
                                            product={product}
                                            quantity={
                                                quantities[product.id] || 1
                                            }
                                            styles={getSubCategoryStyles(
                                                product.subCategory?.name,
                                            )}
                                            onToggleFavorite={
                                                handleToggleFavorite
                                            }
                                            onQuantityChange={
                                                handleQuantityChange
                                            }
                                            onAddToCart={handleAddToCart}
                                            onImageClick={handleOpenModal}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                        <div className="py-20 md:py-32 px-6 text-center">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-rose-50 rounded-full flex items-center justify-center text-[#A80000]">
                                    <Search className="w-8 h-8 md:w-10 md:h-10" />
                                </div>
                                <div className="flex flex-col gap-1 max-w-sm mx-auto">
                                    <p className="text-slate-900 font-black text-base md:text-lg uppercase tracking-tight">No products found</p>
                                    <p className="text-slate-400 text-xs md:text-sm font-medium">Try adjusting your filters or search terms.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ProductDetailsModal 
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onToggleFavorite={handleToggleFavorite}
            />
        </UserLayout>
    );
}
