import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/admin/input";
import { cn } from "@/lib/utils";
import {
    ChevronLeft,
    Save,
    XCircle,
    Trash2,
    PlusCircle,
    LayoutGrid,
} from "lucide-react";

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

export default function Edit({ category }) {
    // এখানে মেইন ক্যাটেগরির ডাটা দিয়ে ফর্ম ইনিশিয়ালাইজ করা হচ্ছে
    const { data, setData, put, processing, errors, clearErrors } = useForm({
        name: category.name || "",
        status: category.status || "active",
        featured: category.featured || false,
        sub_categories:
            category.sub_categories.length > 0
                ? category.sub_categories.map((sub) => ({
                      id: sub.id, // ID রাখতে হবে যেন আপডেট করা যায়
                      name: sub.name,
                      status: sub.status,
                  }))
                : [{ name: "", status: "active" }],
    });

    const updateSubCategory = (subIdx, key, value) => {
        const updated = [...data.sub_categories];
        updated[subIdx][key] = value;
        setData("sub_categories", updated);

        const errorPath = `sub_categories.${subIdx}.${key}`;
        if (errors[errorPath]) clearErrors(errorPath);
    };

    const addSubCategory = () => {
        setData("sub_categories", [
            ...data.sub_categories,
            { name: "", status: "active" },
        ]);
    };

    const removeSubCategory = (subIdx) => {
        const updated = [...data.sub_categories];
        updated.splice(subIdx, 1);
        setData("sub_categories", updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("categories.update", category.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Category" />

            <div className="p-6 bg-[#F8F9FB] min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-[22px] font-bold text-[#212B36] flex items-center gap-2">
                            <LayoutGrid className="text-[#FF9F43]" size={24} />
                            Edit Category
                        </h1>
                        <p className="text-[13px] text-gray-500 font-medium">
                            Modify category and its sub-categories
                        </p>
                    </div>
                    <Link
                        href={route("categories.index")}
                        className="flex items-center gap-2 bg-[#1B2838] text-white px-4 py-2 rounded-lg font-bold text-[13px] shadow-sm"
                    >
                        <ChevronLeft size={19} /> Back to List
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Main Category Section */}
                            <div className="lg:col-span-4 space-y-5 border-r border-gray-100 pr-0 lg:pr-8">
                                <h3 className="text-[14px] font-bold text-[#212B36]">
                                    Main Category Details
                                </h3>

                                <Input
                                    label="Category Name"
                                    value={data.name}
                                    error={errors.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <div className="pt-2">
                                    <label className="text-[13px] font-bold text-[#212B36] mb-1.5 block">
                                        Status
                                    </label>
                                    <select
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-[#FF9F43]"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Sub Categories Section */}
                            <div className="lg:col-span-8 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-[14px] font-bold text-[#212B36]">
                                        Sub Categories
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addSubCategory}
                                        className="text-[12px] font-bold text-[#FF9F43] flex items-center gap-1 hover:underline"
                                    >
                                        <PlusCircle size={14} /> Add New Sub
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {data.sub_categories.map((sub, subIdx) => (
                                        <div
                                            key={subIdx}
                                            className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm relative group/sub"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSubCategory(subIdx)
                                                }
                                                className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 rounded-full border border-gray-100 p-1.5 opacity-0 group-hover/sub:opacity-100 transition-all z-10"
                                            >
                                                <Trash2 size={12} />
                                            </button>

                                            <div className="space-y-3">
                                                <Input
                                                    placeholder="Sub-category name"
                                                    value={sub.name}
                                                    error={
                                                        errors[
                                                            `sub_categories.${subIdx}.name`
                                                        ]
                                                    }
                                                    onChange={(e) =>
                                                        updateSubCategory(
                                                            subIdx,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <ModernSwitch
                                                    label={
                                                        sub.status === "active"
                                                            ? "Active"
                                                            : "Inactive"
                                                    }
                                                    active={
                                                        sub.status === "active"
                                                    }
                                                    onClick={() =>
                                                        updateSubCategory(
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
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 bg-[#FF9F43] text-white px-8 py-2.5 rounded-md hover:bg-[#e68a30] transition font-bold text-[14px] shadow-md disabled:opacity-50"
                        >
                            <Save size={18} />{" "}
                            {processing ? "Updating..." : "Update Category"}
                        </button>
                        <Link
                            href={route("categories.index")}
                            className="flex items-center gap-2 bg-[#1B2838] text-white px-8 py-2.5 rounded-md hover:bg-[#2c3e50] transition font-bold text-[14px] shadow-md"
                        >
                            <XCircle size={18} /> Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
