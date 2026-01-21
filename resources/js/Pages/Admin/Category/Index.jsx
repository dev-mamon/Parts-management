import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { Skeleton } from "@/Components/ui/skeleton";
import { TableManager } from "@/Hooks/TableManager";
import {
    Search,
    Plus,
    Trash2,
    Pencil,
    X,
    Image as ImageIcon,
} from "lucide-react"; // Added ImageIcon
import ConfirmDelete from "@/Components/ui/ConfirmDelete";
import ConfirmBulkDelete from "@/Components/ui/admin/ConfirmBulkDelete";

export default function Index({ category, counts, filters }) {
    const {
        search,
        handleSearch,
        isLoading,
        selectedIds,
        toggleSelectAll,
        toggleSelect,
        selectAllGlobal,
        setSelectAllGlobal,
        clearSelection,
    } = TableManager("categories.index", category?.data || [], { ...filters, only: ["category", "counts"] });

    const currentStatus = filters.status || "all";

    const handleStatusChange = (status) => {
        router.get(route("categories.index"), { ...filters, status, page: 1 }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    // Optimized Loading Logic: Maintain content while re-fetching
    const isDataLoading = isLoading && category.data.length > 0;
    const showSkeleton = isLoading && category.data.length === 0;

    const skeletonRows = Array.from({ length: 5 });

    const isAllPageSelected =
        category.data.length > 0 &&
        (selectAllGlobal ||
            category.data.every((p) => selectedIds.includes(p.id)));

    return (
        <AdminLayout>
            <Head title="Category and Sub Category" />

            <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Categories</h1>
                        <p className="text-slate-500 mt-1">Manage your categories and sub-categories.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <Link href={route("categories.create")} className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 bg-[#FF9F43] text-white text-[13px] font-bold rounded-lg hover:bg-[#e68a30] transition-all duration-200">
                            <Plus size={16} className="mr-2" /> Add Category
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-4 px-1 text-sm border-b border-slate-200 overflow-x-auto custom-scrollbar whitespace-nowrap scroll-smooth">
                    {[
                        { id: "all", label: "All Categories", count: counts.all },
                        { id: "active", label: "Active", count: counts.active },
                        { id: "inactive", label: "Inactive", count: counts.inactive },
                    ].map((tab) => (
                        <button key={tab.id} onClick={() => handleStatusChange(tab.id)} className={`pb-3 transition-all relative font-semibold text-[13px] flex-shrink-0 ${currentStatus === tab.id ? "text-[#FF9F43]" : "text-slate-500 hover:text-slate-700"}`}>
                            {tab.label} <span className="ml-1 text-slate-400 font-medium">({tab.count?.toLocaleString() || 0})</span>
                            {currentStatus === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF9F43] rounded-full" />}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden relative">
                    <div className="flex flex-wrap items-center justify-between p-4 border-b border-slate-100 gap-4">
                        <div className="flex flex-wrap items-center gap-3 flex-1">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text" value={search} onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search categories..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-[13px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 transition-all outline-none border focus:border-[#FF9F43]"
                                />
                            </div>
                        </div>

                        {(selectedIds.length > 0 || selectAllGlobal) && (
                            <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={clearSelection}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-800 text-[13px] font-medium transition-colors"
                                >
                                    Deselect All
                                </button>
                                <ConfirmBulkDelete
                                    selectedIds={selectedIds}
                                    selectAllGlobal={selectAllGlobal}
                                    totalCount={category.total}
                                    search={search}
                                    routeName="categories.bulk-destroy"
                                    onSuccess={clearSelection}
                                />
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto custom-scrollbar relative">
                        {/* Linear Progress Bar */}
                        {isLoading && (
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FF9F43]/10 overflow-hidden z-20">
                                <div className="h-full bg-[#FF9F43] animate-progress-indeterminate w-1/3 rounded-full" />
                            </div>
                        )}

                        {isAllPageSelected && !selectAllGlobal && category.total > category.data.length && (
                            <div className="bg-[#FF9F43]/10 border-b border-[#FF9F43]/20 px-6 py-3 text-[13px] text-[#e68a30] flex items-center justify-center gap-2">
                                <span>All <b>{category.data.length}</b> categories on this page are selected.</span>
                                <button onClick={() => setSelectAllGlobal(true)} className="font-bold underline">Select all {category.total.toLocaleString()}</button>
                            </div>
                        )}

                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-500 font-semibold text-[11px] uppercase tracking-wider border-b border-slate-100">
                                    <th className="py-4 px-6 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={isAllPageSelected}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-slate-300 text-[#FF9F43] focus:ring-[#FF9F43] transition-all cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-4 px-4 font-bold">Category</th>
                                    <th className="py-4 px-4 font-bold">
                                        Sub Categories
                                    </th>
                                    <th className="py-4 px-4 font-bold">Status</th>
                                    <th className="py-4 px-4 text-right pr-8 font-bold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y divide-slate-50 transition-all duration-300 ${
                                isDataLoading ? "opacity-40 grayscale-[0.5] pointer-events-none" : "opacity-100"
                            }`}>
                                {showSkeleton ? (
                                    skeletonRows.map((_, i) => (
                                        <tr key={i}>
                                            <td className="p-6">
                                                <Skeleton className="h-4 w-4 rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-3">
                                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-32" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Skeleton className="h-4 w-24" />
                                            </td>
                                            <td className="p-4">
                                                <Skeleton className="h-6 w-20 rounded-full" />
                                            </td>
                                            <td className="p-4">
                                                <Skeleton className="h-8 w-24 ml-auto" />
                                            </td>
                                        </tr>
                                    ))
                                ) : category.data.length > 0 ? (
                                    category.data.map((item) => {
                                        const isSelected =
                                            selectAllGlobal ||
                                            selectedIds.includes(item.id);
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`${
                                                    isSelected
                                                        ? "bg-[#FF9F43]/5"
                                                        : "hover:bg-slate-50/50"
                                                } transition-colors group`}
                                            >
                                                <td className="py-4 px-6 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() =>
                                                            toggleSelect(
                                                                item.id
                                                            )
                                                        }
                                                        className="w-4 h-4 rounded border-slate-300 text-[#FF9F43] focus:ring-[#FF9F43] transition-all cursor-pointer"
                                                    />
                                                </td>

                                                {/* --- Image and Name Section --- */}
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0">
                                                            {item.image ? (
                                                                <img
                                                                    src={`/${item.image}`}
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <ImageIcon
                                                                    className="text-slate-300"
                                                                    size={20}
                                                                />
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-700">
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4 max-w-[300px]">
                                                    <div className="flex flex-wrap gap-1.5 items-center">
                                                        {item.sub_categories
                                                            ?.length > 0 ? (
                                                            item.sub_categories
                                                                .slice(0, 5)
                                                                .map(
                                                                    (
                                                                        sub,
                                                                        idx
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                sub.id ||
                                                                                idx
                                                                            }
                                                                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border bg-[#FF9F43]/5 text-[#FF9F43] border-[#FF9F43]/10 shadow-sm"
                                                                        >
                                                                            {
                                                                                sub.name
                                                                            }
                                                                        </span>
                                                                    )
                                                                )
                                                        ) : (
                                                            <span className="text-slate-400 text-xs italic">
                                                                No
                                                                Sub-categories
                                                            </span>
                                                        )}
                                                        {item.sub_categories
                                                            ?.length > 5 && (
                                                            <span className="text-[10px] text-slate-500">
                                                                +
                                                                {item
                                                                    .sub_categories
                                                                    .length -
                                                                    5}{" "}
                                                                more
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ring-1 ring-inset ${
                                                            item.status ===
                                                            "active"
                                                                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                                                                : "bg-slate-50 text-slate-500 ring-slate-400/10"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`w-1 h-1 rounded-full mr-1.5 ${
                                                                item.status ===
                                                                "active"
                                                                    ? "bg-emerald-500"
                                                                    : "bg-slate-400"
                                                            }`}
                                                        />
                                                        {item.status}
                                                    </span>
                                                </td>

                                                <td className="py-4 px-4 text-right pr-6">
                                                    <div className="flex justify-end items-center gap-1.5">
                                                        <Link
                                                            href={route(
                                                                "categories.edit",
                                                                item.id
                                                            )}
                                                            className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-[#e68a30] hover:bg-white bg-transparent border border-transparent hover:border-slate-200 rounded-lg transition-all duration-200"
                                                        >
                                                            <Pencil size={15} />
                                                        </Link>
                                                        <ConfirmDelete
                                                            id={item.id}
                                                            routeName="categories.destroy"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-32 text-center text-slate-400 font-medium"
                                        >
                                            No category items found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-5">
                        <Pagination meta={category} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
