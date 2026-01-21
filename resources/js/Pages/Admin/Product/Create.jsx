import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/admin/input";
import FileUpload from "@/Components/ui/admin/FileUpload";
import {
    ChevronLeft,
    Save,
    Plus,
    Trash2,
    Info,
    Settings,
    Tag,
} from "lucide-react";

export default function Create({ categories, subCategories }) {
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            description: "",
            buy_price: "",
            list_price: "",
            sku: "",
            location_id: "",
            visibility: "public",
            category_id: "",
            sub_category_id: "",
            stock_oakville: 0,
            stock_mississauga: 0,
            stock_saskatoon: 0,
            part_numbers: [""],
            fitments: [{ year_from: "", year_to: "", make: "", model: "" }],
            images: [],
        });

    // --- Logic ---
    const filteredSubCategories = subCategories?.filter(
        (sub) => Number(sub.category_id) === Number(data.category_id)
    );

    const handleInputChange = (field, value) => {
        setData(field, value);
        if (errors[field]) clearErrors(field);
    };

    const updateFitment = (index, field, value) => {
        const updated = [...data.fitments];
        updated[index][field] = value;
        setData("fitments", updated);

        const errorKey = `fitments.${index}.${field}`;
        if (errors[errorKey]) clearErrors(errorKey);
    };

    const updatePartNumber = (index, value) => {
        const updated = [...data.part_numbers];
        updated[index] = value;
        setData("part_numbers", updated);

        const errorKey = `part_numbers.${index}`;
        if (errors[errorKey]) clearErrors(errorKey);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Product" />
            <div className="p-6 bg-slate-50/50 min-h-screen font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Plus className="text-[#FF9F43]" size={24} /> 
                            <span>Create New Product</span>
                        </h1>
                        <p className="text-slate-500 text-[13px] mt-1">Add a new item to your inventory catalog.</p>
                    </div>
                    <Link
                        href={route("products.index")}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        <ChevronLeft size={16} /> Back to Inventory
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Description Section */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-5 flex items-center gap-2">
                                <Info size={18} className="text-[#FF9F43]" />
                                Product Description
                            </h3>
                            <Input
                                isTextArea
                                placeholder="Write a detailed description of the product..."
                                className="min-h-[140px] text-[13px] focus:ring-[#FF9F43]/10"
                                value={data.description}
                                error={errors.description}
                                onChange={(e) =>
                                    handleInputChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        {/* Fitments Section */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
                                <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                    <Settings
                                        size={18}
                                        className="text-[#FF9F43]"
                                    />
                                    Vehicle Fitment
                                </h3>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData("fitments", [
                                            ...data.fitments,
                                            {
                                                year_from: "",
                                                year_to: "",
                                                make: "",
                                                model: "",
                                            },
                                        ])
                                    }
                                    className="text-[12px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                                >
                                    <Plus size={14} /> Add New Row
                                </button>
                            </div>

                            <div className="space-y-4">
                                {data.fitments.map((fit, idx) => (
                                    <div
                                        key={idx}
                                        className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-slate-50/40 p-5 rounded-2xl border border-slate-100 relative group"
                                    >
                                        <Input
                                            label="Year From"
                                            placeholder="2018"
                                            className="bg-white text-[13px]"
                                            value={fit.year_from}
                                            error={errors[`fitments.${idx}.year_from`]}
                                            onChange={(e) => updateFitment(idx, "year_from", e.target.value)}
                                        />
                                        <Input
                                            label="Year To"
                                            placeholder="2024"
                                            className="bg-white text-[13px]"
                                            value={fit.year_to}
                                            error={errors[`fitments.${idx}.year_to`]}
                                            onChange={(e) => updateFitment(idx, "year_to", e.target.value)}
                                        />
                                        <Input
                                            label="Make"
                                            placeholder="e.g. Toyota"
                                            className="bg-white text-[13px]"
                                            value={fit.make}
                                            error={errors[`fitments.${idx}.make`]}
                                            onChange={(e) => updateFitment(idx, "make", e.target.value)}
                                        />
                                        <div className="flex gap-3 items-end">
                                            <Input
                                                label="Model"
                                                placeholder="e.g. RAV4"
                                                className="grow bg-white text-[13px]"
                                                value={fit.model}
                                                error={errors[`fitments.${idx}.model`]}
                                                onChange={(e) => updateFitment(idx, "model", e.target.value)}
                                            />
                                            {data.fitments.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            "fitments",
                                                            data.fitments.filter(
                                                                (_, i) =>
                                                                    i !== idx
                                                            )
                                                        )
                                                    }
                                                    className="inline-flex items-center justify-center w-9 h-9 text-slate-300 hover:text-rose-500 bg-white border border-slate-100 rounded-lg shadow-sm mb-[2px] transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Part Numbers Section */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <Tag size={18} className="text-[#FF9F43]" />
                                Alternate Part Numbers
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {data.part_numbers.map((part, idx) => (
                                    <div
                                        key={idx}
                                        className="relative group"
                                    >
                                        <Input
                                            placeholder="OEM-99827-BC"
                                            className="bg-slate-50 border-slate-100 focus:bg-white text-[13px]"
                                            value={part}
                                            error={errors[`part_numbers.${idx}`]}
                                            onChange={(e) => updatePartNumber(idx, e.target.value)}
                                        />
                                        {data.part_numbers.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "part_numbers",
                                                        data.part_numbers.filter(
                                                            (_, i) => i !== idx
                                                        )
                                                    )
                                                }
                                                className="absolute -top-1.5 -right-1.5 bg-white text-slate-300 hover:text-rose-500 rounded-lg w-6 h-6 border border-slate-100 shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setData("part_numbers", [...data.part_numbers, ""])}
                                    className="h-[42px] border-2 border-dashed border-slate-200 text-slate-400 rounded-xl flex items-center justify-center hover:border-[#FF9F43]/50 hover:text-[#FF9F43] transition-all bg-slate-50/10"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Category Grid */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-5 flex items-center justify-between">
                                <span>Category</span>
                                <Link
                                    href={route("categories.create")}
                                    className="text-[11px] font-bold text-slate-500 hover:text-[#FF9F43] bg-slate-50 border border-slate-100 px-2 py-1 rounded"
                                >
                                    Add New
                                </Link>
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {categories?.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => {
                                            setData((prev) => ({
                                                ...prev,
                                                category_id: cat.id,
                                                sub_category_id: "",
                                            }));
                                            clearErrors("category_id");
                                        }}
                                        className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all truncate ${
                                            data.category_id === cat.id
                                                ? "bg-[#FF9F43] text-white border-[#FF9F43]"
                                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                            {errors.category_id && (
                                <p className="text-rose-500 text-[11px] mt-2 italic">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Sub Category Grid */}
                        {data.category_id && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                <h3 className="text-[14px] font-bold text-slate-800 mb-5">Sub Category</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {filteredSubCategories?.map((sub) => (
                                        <button
                                            key={sub.id}
                                            type="button"
                                            onClick={() => {
                                                setData(
                                                    "sub_category_id",
                                                    sub.id
                                                );
                                                clearErrors("sub_category_id");
                                            }}
                                            className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all truncate ${
                                                data.sub_category_id === sub.id
                                                    ? "bg-[#FF9F43] text-white border-[#FF9F43]"
                                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                            }`}
                                        >
                                            {sub.name}
                                        </button>
                                    ))}
                                </div>
                                {filteredSubCategories.length === 0 && (
                                    <p className="text-slate-400 text-[11px] italic">No sub-categories available.</p>
                                )}
                            </div>
                        )}

                        {/* Inventory & Specs */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-6">
                            <div className="space-y-4 pb-4 border-b border-slate-50">
                                <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Pricing (USD)</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Buy Price"
                                        type="number"
                                        placeholder="0.00"
                                        className="text-[13px]"
                                        value={data.buy_price}
                                        error={errors.buy_price}
                                        onChange={(e) => handleInputChange("buy_price", e.target.value)}
                                    />
                                    <Input
                                        label="List Price"
                                        type="number"
                                        placeholder="0.00"
                                        className="text-[13px]"
                                        value={data.list_price}
                                        error={errors.list_price}
                                        onChange={(e) => handleInputChange("list_price", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pb-4 border-b border-slate-50">
                                <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Inventory Status</h4>
                                <div className="grid grid-cols-3 gap-3">
                                    <Input
                                        label="Oakville"
                                        type="number"
                                        className="text-[13px]"
                                        value={data.stock_oakville}
                                        onChange={(e) => handleInputChange("stock_oakville", e.target.value)}
                                    />
                                    <Input
                                        label="Mississauga"
                                        type="number"
                                        className="text-[13px]"
                                        value={data.stock_mississauga}
                                        onChange={(e) => handleInputChange("stock_mississauga", e.target.value)}
                                    />
                                    <Input
                                        label="Saskatoon"
                                        type="number"
                                        className="text-[13px]"
                                        value={data.stock_saskatoon}
                                        onChange={(e) => handleInputChange("stock_saskatoon", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-1">
                                <Input
                                    label="SKU ID"
                                    placeholder="SKU-..."
                                    className="text-[13px]"
                                    value={data.sku}
                                    error={errors.sku}
                                    onChange={(e) => handleInputChange("sku", e.target.value)}
                                />
                                <Input
                                    label="Location"
                                    placeholder="BIN-..."
                                    className="text-[13px]"
                                    value={data.location_id}
                                    error={errors.location_id}
                                    onChange={(e) => handleInputChange("location_id", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Media Section */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <FileUpload
                                data={data}
                                setData={setData}
                                errors={errors}
                                clearErrors={clearErrors}
                                field="images"
                                label="Product Images"
                                multiple={true}
                                className="text-[13px]"
                            />
                        </div>

                        {/* Form Submission */}
                        <div className="flex gap-3 pt-6 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-[#FF9F43] text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#e68a30] active:scale-95 transition-all disabled:opacity-50"
                            >
                                <Save size={18} />
                                {processing ? "Publishing..." : "Publish Product"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    clearErrors();
                                }}
                                className="w-20 bg-slate-100 text-slate-600 h-12 rounded-xl font-bold hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
