import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/admin/input";
import FileUpload from "@/Components/ui/admin/FileUpload";
import {
    ChevronLeft,
    Save,
    XCircle,
    Plus,
    Trash2,
    PlusCircle,
    LayoutGrid,
} from "lucide-react";

// --- Reusable Modern Switch Component ---
const ModernSwitch = ({ label, active, onClick }) => (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-[12px] h-[54px] w-full transition-all">
        <span className="text-gray-700 font-medium text-[14px]">{label}</span>
        <button
            type="button"
            onClick={onClick}
            className={`w-[48px] h-[24px] rounded-full relative transition-all duration-300 flex items-center ${
                active ? "bg-[#FF9F43]" : "bg-gray-300"
            }`}
        >
            <div
                className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-all duration-300 absolute ${
                    active ? "left-[26px]" : "left-[4px]"
                }`}
            ></div>
        </button>
    </div>
);

export default function Create() {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            categories: [
                {
                    name: "",
                    image: null, // Added image field
                    status: "active",
                    featured: false,
                    sub_categories: [{ name: "", status: "active" }],
                },
            ],
        });

    const addCategory = () => {
        if (data.categories.length < 20) {
            setData("categories", [
                ...data.categories,
                {
                    name: "",
                    image: null, // Added image field
                    status: "active",
                    featured: false,
                    sub_categories: [{ name: "", status: "active" }],
                },
            ]);
        }
    };

    const removeCategory = (index) => {
        const updated = [...data.categories];
        updated.splice(index, 1);
        setData("categories", updated);
    };

    const updateCategory = (index, key, value) => {
        const updated = [...data.categories];
        updated[index][key] = value;
        setData("categories", updated);

        const errorPath = `categories.${index}.${key}`;
        if (errors[errorPath]) clearErrors(errorPath);
    };

    // Helper for FileUpload specifically for nested objects
    const handleImageUpdate = (index, file) => {
        updateCategory(index, "image", file);
    };

    const addSubCategory = (index) => {
        const updated = [...data.categories];
        updated[index].sub_categories.push({ name: "", status: "active" });
        setData("categories", updated);
    };

    const updateSubCategory = (catIdx, subIdx, key, value) => {
        const updated = [...data.categories];
        updated[catIdx].sub_categories[subIdx][key] = value;
        setData("categories", updated);

        const errorPath = `categories.${catIdx}.sub_categories.${subIdx}.${key}`;
        if (errors[errorPath]) clearErrors(errorPath);
    };

    const removeSubCategory = (catIdx, subIdx) => {
        const updated = [...data.categories];
        updated[catIdx].sub_categories.splice(subIdx, 1);
        setData("categories", updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("categories.store"), {
            onSuccess: () => reset(),
            forceFormData: true, // Ensuring multipart/form-data for files
        });
    };

    return (
        <AdminLayout>
            <Head title="Bulk Category Creation" />

            <div className="p-6 bg-[#F8F9FB] min-h-screen">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-[22px] font-bold text-[#212B36] flex items-center gap-2">
                            <LayoutGrid className="text-[#FF9F43]" size={24} />
                            Add Categories
                        </h1>
                        <p className="text-[13px] text-gray-500 font-medium">
                            Bulk creation mode: Manage multiple categories and
                            sub-categories
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={addCategory}
                            disabled={data.categories.length >= 20}
                            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-bold text-[13px] shadow-sm disabled:opacity-50"
                        >
                            <Plus size={18} /> Add New Row
                        </button>
                        <Link
                            href={route("categories.index")}
                            className="flex items-center gap-2 bg-[#1B2838] text-white px-4 py-2 rounded-lg hover:bg-[#2c3e50] transition font-bold text-[13px] shadow-sm"
                        >
                            <ChevronLeft size={19} /> Back to List
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {data.categories.map((cat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 relative group transition-all hover:border-[#FF9F43]/40"
                        >
                            {data.categories.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeCategory(index)}
                                    className="absolute -top-3 -right-3 bg-red-50 text-red-500 p-2 rounded-full border border-red-100 shadow-sm hover:bg-red-500 hover:text-white transition-all z-10"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Main Category Section */}
                                <div className="lg:col-span-5 space-y-5 border-r border-gray-100 pr-0 lg:pr-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-6 h-6 rounded-full bg-[#FF9F43]/10 text-[#FF9F43] flex items-center justify-center text-[12px] font-bold">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-[14px] font-bold text-[#212B36]">
                                            Main Category
                                        </h3>
                                    </div>

                                    <Input
                                        label="Category Name"
                                        placeholder="Enter category name..."
                                        value={cat.name}
                                        error={
                                            errors[`categories.${index}.name`]
                                        }
                                        onChange={(e) =>
                                            updateCategory(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="bg-gray-50/50"
                                    />

                                    {/* --- Integrated Image Upload --- */}
                                    <FileUpload
                                        label="Category Image"
                                        field={`categories.${index}.image`}
                                        data={data}
                                        // We pass a custom setData specifically for this index
                                        setData={(field, value) =>
                                            handleImageUpdate(index, value)
                                        }
                                        errors={errors}
                                        clearErrors={clearErrors}
                                    />

                                    <div className="pt-2">
                                        <label className="text-[13px] font-bold text-[#212B36] mb-1.5 block">
                                            Status
                                        </label>
                                        <select
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-[#FF9F43] bg-white transition-all"
                                            value={cat.status}
                                            onChange={(e) =>
                                                updateCategory(
                                                    index,
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="inactive">
                                                Inactive
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Sub Categories Section */}
                                <div className="lg:col-span-7 space-y-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-[14px] font-bold text-[#212B36]">
                                            Sub Categories
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addSubCategory(index)
                                            }
                                            className="text-[12px] font-bold text-[#FF9F43] flex items-center gap-1 hover:underline"
                                        >
                                            <PlusCircle size={14} /> Add New Sub
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {cat.sub_categories.map(
                                            (sub, subIdx) => (
                                                <div
                                                    key={subIdx}
                                                    className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm relative group/sub"
                                                >
                                                    {cat.sub_categories.length >
                                                        1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeSubCategory(
                                                                    index,
                                                                    subIdx
                                                                )
                                                            }
                                                            className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 rounded-full border border-gray-100 shadow-sm p-1.5 opacity-0 group-hover/sub:opacity-100 transition-all z-10"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    )}

                                                    <div className="space-y-3">
                                                        <Input
                                                            placeholder="Sub-category name"
                                                            value={sub.name}
                                                            error={
                                                                errors[
                                                                    `categories.${index}.sub_categories.${subIdx}.name`
                                                                ]
                                                            }
                                                            onChange={(e) =>
                                                                updateSubCategory(
                                                                    index,
                                                                    subIdx,
                                                                    "name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="h-10 text-sm"
                                                        />

                                                        <ModernSwitch
                                                            label={
                                                                sub.status ===
                                                                "active"
                                                                    ? "Active"
                                                                    : "Inactive"
                                                            }
                                                            active={
                                                                sub.status ===
                                                                "active"
                                                            }
                                                            onClick={() =>
                                                                updateSubCategory(
                                                                    index,
                                                                    subIdx,
                                                                    "status",
                                                                    sub.status ===
                                                                        "active"
                                                                        ? "inactive"
                                                                        : "active"
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Footer Actions */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <span className="text-gray-400">
                                Creation Limit:
                            </span>
                            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                                <span
                                    className={`font-bold ${
                                        data.categories.length >= 20
                                            ? "text-red-500"
                                            : "text-[#FF9F43]"
                                    }`}
                                >
                                    {data.categories.length}
                                </span>
                                <span className="mx-1 text-gray-400">/</span>
                                <span className="text-gray-600 font-semibold">
                                    20 Categories
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 bg-[#FF9F43] text-white px-8 py-2.5 rounded-md hover:bg-[#e68a30] transition font-bold text-[14px] shadow-md disabled:opacity-50"
                            >
                                <Save size={18} />
                                {processing ? "Saving..." : "Save Categories"}
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="flex items-center gap-2 bg-[#1B2838] text-white px-8 py-2.5 rounded-md hover:bg-[#2c3e50] transition font-bold text-[14px] shadow-md"
                            >
                                <XCircle size={18} /> Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
