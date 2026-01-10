import React, { useRef } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { Skeleton } from "@/Components/ui/admin/skeleton";
import { TableManager } from "@/Hooks/TableManager";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    Plus,
    Pencil,
    Calendar,
    MapPin,
    ImageOff,
    X,
    ChevronDown,
    Check,
    Download,
    Upload,
} from "lucide-react";
import ConfirmDelete from "@/Components/ui/admin/ConfirmDelete";
import ConfirmBulkDelete from "@/Components/ui/admin/ConfirmBulkDelete";

export default function Index({
    products,
    categories = [],
    subCategories = [],
    filters = {},
}) {
    const fileInputRef = useRef(null);
    const {
        search,
        handleSearch,
        isLoading,
        selectedIds,
        toggleSelectAll,
        toggleSelect,
        selectAllGlobal,
        clearSelection,
    } = TableManager("products.index", products.data);

    // Filter names for URL sync
    const currentCategoryName = filters.category || "";
    const currentSubCategoryName = filters.sub_category || "";

    // Dependent Dropdown Logic
    const selectedCategory = categories.find(
        (c) => c.name === currentCategoryName
    );
    const filteredSubCategories = selectedCategory
        ? subCategories.filter((sub) => sub.category_id === selectedCategory.id)
        : [];

    const skeletonRows = Array.from({ length: 5 });

    const handleImportClick = () => {
        // console.log("Ongoing import...");
        alert("Ongoing import...");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            router.post(route("products.import"), formData, {
                forceFormData: true,
            });
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getStatusBadge = (status) => {
        const config = {
            public: {
                classes:
                    "bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-100",
                dot: "bg-emerald-500",
                ping: true,
            },
            visible: {
                classes:
                    "bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-100",
                dot: "bg-emerald-500",
                ping: true,
            },
            private: {
                classes:
                    "bg-amber-50 text-amber-700 border-amber-100 ring-amber-100",
                dot: "bg-amber-500",
                ping: false,
            },
            draft: {
                classes:
                    "bg-slate-50 text-slate-600 border-slate-100 ring-slate-100",
                dot: "bg-slate-400",
                ping: false,
            },
        };
        const theme = config[status?.toLowerCase()] || config.draft;
        return (
            <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sm ring-1 transition-all ${theme.classes}`}
            >
                <span className="relative flex h-2 w-2 mr-2">
                    {theme.ping && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${theme.dot}`}
                    ></span>
                </span>
                {status || "Draft"}
            </span>
        );
    };

    const isAllPageSelected =
        products.data.length > 0 &&
        (selectAllGlobal ||
            products.data.every((p) => selectedIds.includes(p.id)));

    return (
        <AdminLayout>
            <Head title="Products" />

            <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
                {/* Header with Import/Export */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Products
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Manage inventory and item visibility.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".xlsx,.xls,.csv"
                        />

                        <button
                            onClick={handleImportClick}
                            className="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-md font-bold text-[13px] flex items-center gap-2 hover:bg-slate-50 transition-colors"
                        >
                            <Upload size={16} /> Import
                        </button>

                        <a
                            href={route("products.export")}
                            className="bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-md font-bold text-[13px] flex items-center gap-2 hover:bg-slate-50 transition-colors"
                        >
                            <Download size={16} /> Export
                        </a>

                        <Link
                            href={route("products.create")}
                            className="bg-[#FF9F43] text-white px-4 py-2 rounded-md font-bold text-[13px] flex items-center gap-2 hover:bg-[#e68a2e] transition-colors shadow-sm"
                        >
                            <Plus size={16} /> Add item
                        </Link>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between p-4 border-b border-slate-100 gap-4">
                        <div className="flex flex-wrap items-center gap-3 flex-1">
                            <div className="relative w-full max-w-md">
                                <Search
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    placeholder="Search by Part #, Partslink, SKU, Keyword..."
                                    className="w-full pl-11 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none border"
                                />
                            </div>

                            {/* Category Filter */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center h-10 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
                                    {currentCategoryName || "All Categories"}
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="start"
                                    className="w-56 p-1"
                                >
                                    <Link
                                        href={route("products.index", {
                                            ...filters,
                                            category: null,
                                            sub_category: null,
                                        })}
                                        preserveState
                                    >
                                        <DropdownMenuItem className="cursor-pointer">
                                            All Categories
                                        </DropdownMenuItem>
                                    </Link>
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={route("products.index", {
                                                ...filters,
                                                category: cat.name,
                                                sub_category: null,
                                            })}
                                            preserveState
                                        >
                                            <DropdownMenuItem className="flex justify-between cursor-pointer">
                                                {cat.name}{" "}
                                                {currentCategoryName ===
                                                    cat.name && (
                                                    <Check
                                                        size={14}
                                                        className="text-indigo-600"
                                                    />
                                                )}
                                            </DropdownMenuItem>
                                        </Link>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Sub-Category Filter */}
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    disabled={!currentCategoryName}
                                    className="flex items-center h-10 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 disabled:opacity-50"
                                >
                                    {currentSubCategoryName || "Sub-category"}
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="start"
                                    className="w-56 p-1"
                                >
                                    <Link
                                        href={route("products.index", {
                                            ...filters,
                                            sub_category: null,
                                        })}
                                        preserveState
                                    >
                                        <DropdownMenuItem className="cursor-pointer">
                                            All Sub-categories
                                        </DropdownMenuItem>
                                    </Link>
                                    {filteredSubCategories.map((sub) => (
                                        <Link
                                            key={sub.id}
                                            href={route("products.index", {
                                                ...filters,
                                                sub_category: sub.name,
                                            })}
                                            preserveState
                                        >
                                            <DropdownMenuItem className="flex justify-between cursor-pointer">
                                                {sub.name}{" "}
                                                {currentSubCategoryName ===
                                                    sub.name && (
                                                    <Check
                                                        size={14}
                                                        className="text-indigo-600"
                                                    />
                                                )}
                                            </DropdownMenuItem>
                                        </Link>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {(currentCategoryName ||
                                currentSubCategoryName ||
                                search) && (
                                <Link
                                    href={route("products.index")}
                                    className="text-rose-600 text-sm font-semibold flex items-center px-2"
                                >
                                    <X size={16} className="mr-1" /> Clear
                                    Filter
                                </Link>
                            )}
                        </div>

                        {(selectedIds.length > 0 || selectAllGlobal) && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-500 mr-2">
                                    {selectAllGlobal
                                        ? products.total
                                        : selectedIds.length}{" "}
                                    selected
                                </span>
                                <ConfirmBulkDelete
                                    selectedIds={selectedIds}
                                    selectAllGlobal={selectAllGlobal}
                                    totalCount={products.total}
                                    search={search}
                                    routeName="products.bulk-destroy"
                                    onSuccess={clearSelection}
                                />
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-500 font-semibold text-[12px] uppercase tracking-wider border-b border-slate-100">
                                    <th className="py-4 px-6 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={isAllPageSelected}
                                            onChange={toggleSelectAll}
                                            className="rounded border-slate-300 text-indigo-600 focus:ring-0"
                                        />
                                    </th>
                                    <th className="py-4 px-4">Product Info</th>
                                    <th className="py-4 px-4">Stock</th>
                                    <th className="py-4 px-4">SKU</th>
                                    <th className="py-4 px-4">Location</th>
                                    <th className="py-4 px-4">Pricing</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4 text-right pr-8">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {isLoading
                                    ? skeletonRows.map((_, i) => (
                                          <tr
                                              key={`skeleton-${i}`}
                                              className="border-b border-slate-50"
                                          >
                                              <td className="py-4 px-6 text-center">
                                                  <Skeleton className="h-4 w-4 rounded mx-auto" />
                                              </td>
                                              <td className="py-4 px-4">
                                                  <div className="flex gap-3">
                                                      <Skeleton className="w-12 h-12 rounded-lg" />
                                                      <div className="space-y-2">
                                                          <Skeleton className="h-4 w-40" />
                                                          <Skeleton className="h-3 w-24" />
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="py-4 px-4">
                                                  <div className="space-y-1">
                                                      <Skeleton className="h-3 w-12" />
                                                      <Skeleton className="h-3 w-12" />
                                                      <Skeleton className="h-3 w-12" />
                                                  </div>
                                              </td>
                                              <td className="py-4 px-4">
                                                  <Skeleton className="h-5 w-16 rounded" />
                                              </td>
                                              <td className="py-4 px-4">
                                                  <Skeleton className="h-4 w-20" />
                                              </td>
                                              <td className="py-4 px-4">
                                                  <div className="space-y-1">
                                                      <Skeleton className="h-4 w-14" />
                                                      <Skeleton className="h-3 w-10" />
                                                  </div>
                                              </td>
                                              <td className="py-4 px-4">
                                                  <Skeleton className="h-6 w-20 rounded-full" />
                                              </td>
                                              <td className="py-4 px-3 text-right pr-6">
                                                  <div className="flex justify-end gap-2">
                                                      <Skeleton className="h-8 w-8 rounded" />
                                                      <Skeleton className="h-8 w-8 rounded" />
                                                  </div>
                                              </td>
                                          </tr>
                                      ))
                                    : products.data.map((item) => {
                                          const isSelected =
                                              selectAllGlobal ||
                                              selectedIds.includes(item.id);
                                          const totalStock =
                                              (Number(item.stock_oakville) ||
                                                  0) +
                                              (Number(item.stock_mississauga) ||
                                                  0) +
                                              (Number(item.stock_saskatoon) ||
                                                  0);
                                          const firstImage =
                                              item.files?.find(
                                                  (f) => f.file_type === "image"
                                              ) || item.files?.[0];
                                          return (
                                              <tr
                                                  key={item.id}
                                                  className={`${
                                                      isSelected
                                                          ? "bg-indigo-50/30"
                                                          : "hover:bg-slate-50/50"
                                                  } transition-colors text-[13px]`}
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
                                                          className="rounded border-slate-300 text-indigo-600"
                                                      />
                                                  </td>
                                                  <td className="py-4 px-4">
                                                      <div className="flex gap-3 max-w-[320px]">
                                                          <div className="w-12 h-12 rounded-lg border overflow-hidden bg-slate-100 flex items-center justify-center">
                                                              {firstImage ? (
                                                                  <img
                                                                      src={`/${firstImage.file_path}`}
                                                                      className="w-full h-full object-cover"
                                                                  />
                                                              ) : (
                                                                  <ImageOff className="w-5 h-5 text-slate-400" />
                                                              )}
                                                          </div>
                                                          <div className="flex flex-col">
                                                              <span className="font-bold text-slate-800 leading-tight mb-1 truncate w-48">
                                                                  {
                                                                      item.description
                                                                  }
                                                              </span>
                                                              <div className="flex gap-1 mb-1">
                                                                  <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100 font-bold uppercase">
                                                                      {item
                                                                          .category
                                                                          ?.name ||
                                                                          "N/A"}
                                                                  </span>
                                                              </div>
                                                              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                                                  <Calendar
                                                                      size={12}
                                                                  />{" "}
                                                                  {formatDate(
                                                                      item.created_at
                                                                  )}
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </td>
                                                  <td className="py-4 px-4">
                                                      {totalStock === 0 ? (
                                                          <span className="text-rose-500 text-[10px] font-black uppercase italic bg-rose-50 px-2 py-1 rounded border border-rose-100">
                                                              Out of Stock
                                                          </span>
                                                      ) : (
                                                          <div className="text-[10px] space-y-0.5 text-slate-600 font-medium">
                                                              <div>
                                                                  Oak:{" "}
                                                                  <span className="font-bold">
                                                                      {item.stock_oakville ||
                                                                          0}
                                                                  </span>
                                                              </div>
                                                              <div>
                                                                  Mis:{" "}
                                                                  <span className="font-bold">
                                                                      {item.stock_mississauga ||
                                                                          0}
                                                                  </span>
                                                              </div>
                                                              <div>
                                                                  Sas:{" "}
                                                                  <span className="font-bold">
                                                                      {item.stock_saskatoon ||
                                                                          0}
                                                                  </span>
                                                              </div>
                                                          </div>
                                                      )}
                                                  </td>
                                                  <td className="py-4 px-4">
                                                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold">
                                                          {item.sku}
                                                      </span>
                                                  </td>
                                                  <td className="py-4 px-4 text-slate-500 font-medium italic">
                                                      <div className="flex items-center gap-1">
                                                          <MapPin
                                                              size={12}
                                                              className="text-slate-400"
                                                          />{" "}
                                                          {item.location_id ||
                                                              "N/A"}
                                                      </div>
                                                  </td>
                                                  <td className="py-4 px-4">
                                                      <div className="flex flex-col leading-tight">
                                                          <span className="text-slate-800 font-bold text-sm">
                                                              ${item.list_price}
                                                          </span>
                                                          <span className="text-[10px] text-slate-400 uppercase">
                                                              Buy: $
                                                              {item.buy_price}
                                                          </span>
                                                      </div>
                                                  </td>
                                                  <td className="py-4 px-4">
                                                      {getStatusBadge(
                                                          item.visibility
                                                      )}
                                                  </td>
                                                  <td className="py-4 px-3 text-right pr-6">
                                                      <div className="flex justify-end gap-2">
                                                          <Link
                                                              href={route(
                                                                  "products.edit",
                                                                  item.id
                                                              )}
                                                              className="p-1.5 text-gray-400 hover:text-blue-500 bg-white border border-slate-200 rounded shadow-sm hover:shadow-md transition-all"
                                                          >
                                                              <Pencil
                                                                  size={15}
                                                              />
                                                          </Link>
                                                          <ConfirmDelete
                                                              id={item.id}
                                                              routeName="products.destroy"
                                                          />
                                                      </div>
                                                  </td>
                                              </tr>
                                          );
                                      })}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-5 border-t border-slate-100 bg-slate-50/20">
                        <Pagination meta={products} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
