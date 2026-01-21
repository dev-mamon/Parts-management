import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { 
    Users, 
    Save, 
    Trash2, 
    ChevronLeft,
    Pencil,
    Car,
    FileText,
    MapPin,
    Package,
    Plus,
} from "lucide-react";
import { Input } from "@/Components/ui/admin/input";

export default function Edit({ lead }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        shop_name: lead.shop_name || "",
        name: lead.name || "",
        contact_number: lead.contact_number || "",
        email: lead.email || "",
        street_address: lead.street_address || "",
        unit_number: lead.unit_number || "",
        city: lead.city || "",
        province: lead.province || "",
        postcode: lead.postcode || "",
        country: lead.country || "",
        notes: lead.notes || "",
        vehicle_info: lead.vehicle_info || "",
        vin: lead.vin || "",
        color_code: lead.color_code || "",
        engine_size: lead.engine_size || "",
        parts: lead.parts.length > 0 ? lead.parts : [
            {
                part_name: "",
                vendor: "",
                buy_price: "0",
                sell_price: "0",
                payment_status: "Pending",
                method: "Cash",
            }
        ]
    });

    const addPartRow = () => {
        setData("parts", [
            ...data.parts,
            {
                part_name: "",
                vendor: "",
                buy_price: "0",
                sell_price: "0",
                payment_status: "Pending",
                method: "Cash",
            }
        ]);
    };

    const removePartRow = (index) => {
        const newParts = [...data.parts];
        newParts.splice(index, 1);
        setData("parts", newParts);
    };

    const handlePartChange = (index, field, value) => {
        const newParts = [...data.parts];
        newParts[index][field] = value;
        setData("parts", newParts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.leads.update", lead.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Lead - ${lead.shop_name}`} />

            <div className="p-6 bg-slate-50/50 min-h-screen font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Pencil className="text-[#FF9F43]" size={24} /> 
                            <span>Edit Lead: {lead.shop_name}</span>
                        </h1>
                        <p className="text-slate-500 text-[13px] mt-1">Update lead information and manage vehicle parts requests.</p>
                    </div>
                    <Link
                        href={route("admin.leads.index")}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        <ChevronLeft size={16} /> Back to Leads
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Shop & Requester Info */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-5 flex items-center gap-2">
                                <Users size={18} className="text-[#FF9F43]" />
                                Shop & Requester Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Shop Name"
                                    placeholder="Enter shop name"
                                    value={data.shop_name}
                                    onChange={(e) => setData("shop_name", e.target.value)}
                                    error={errors.shop_name}
                                />
                                <Input
                                    label="Requester Name"
                                    placeholder="Enter name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    error={errors.name}
                                />
                                <Input
                                    label="Contact Number"
                                    placeholder="Telephone number"
                                    value={data.contact_number}
                                    onChange={(e) => setData("contact_number", e.target.value)}
                                    error={errors.contact_number}
                                />
                                <Input
                                    label="Email Address"
                                    placeholder="Email address"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    error={errors.email}
                                />
                            </div>
                        </div>

                        {/* Address Details */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-5 flex items-center gap-2">
                                <MapPin size={18} className="text-[#FF9F43]" />
                                Address Details
                            </h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-1">
                                        <Input
                                            label="Street Address"
                                            placeholder="Street address"
                                            value={data.street_address}
                                            onChange={(e) => setData("street_address", e.target.value)}
                                            error={errors.street_address}
                                        />
                                    </div>
                                    <Input
                                        label="Unit #"
                                        placeholder="Unit #"
                                        value={data.unit_number}
                                        onChange={(e) => setData("unit_number", e.target.value)}
                                        error={errors.unit_number}
                                    />
                                    <Input
                                        label="City"
                                        placeholder="City"
                                        value={data.city}
                                        onChange={(e) => setData("city", e.target.value)}
                                        error={errors.city}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Input
                                        label="Province"
                                        placeholder="Province"
                                        value={data.province}
                                        onChange={(e) => setData("province", e.target.value)}
                                        error={errors.province}
                                    />
                                    <Input
                                        label="Postcode"
                                        placeholder="Postcode"
                                        value={data.postcode}
                                        onChange={(e) => setData("postcode", e.target.value)}
                                        error={errors.postcode}
                                    />
                                    <Input
                                        label="Country"
                                        placeholder="Country"
                                        value={data.country}
                                        onChange={(e) => setData("country", e.target.value)}
                                        error={errors.country}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Specification */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-5 flex items-center gap-2">
                                <Car size={18} className="text-[#FF9F43]" />
                                Vehicle Specification
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-6">
                                    <Input
                                        label="Vehicle"
                                        placeholder="Year, Make, Model, Trim Level"
                                        value={data.vehicle_info}
                                        onChange={(e) => setData("vehicle_info", e.target.value)}
                                        error={errors.vehicle_info}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        label="VIN"
                                        placeholder="VIN Number"
                                        value={data.vin}
                                        onChange={(e) => setData("vin", e.target.value)}
                                        error={errors.vin}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        label="Color Code"
                                        placeholder="Color Code"
                                        value={data.color_code}
                                        onChange={(e) => setData("color_code", e.target.value)}
                                        error={errors.color_code}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        label="Engine Size"
                                        placeholder="Engine Size"
                                        value={data.engine_size}
                                        onChange={(e) => setData("engine_size", e.target.value)}
                                        error={errors.engine_size}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Parts Selection */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
                                <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                    <Package size={18} className="text-[#FF9F43]" />
                                    Parts Selection
                                </h3>
                                <button
                                    type="button"
                                    onClick={addPartRow}
                                    className="text-[12px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                                >
                                    <Plus size={14} /> Add New Row
                                </button>
                            </div>

                            <div className="space-y-4">
                                {data.parts.map((part, idx) => (
                                    <div 
                                        key={idx} 
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50/40 p-5 rounded-2xl border border-slate-100 relative group"
                                    >
                                        <div className="md:col-span-3">
                                            <Input
                                                label={idx === 0 ? "Part Name" : ""}
                                                placeholder="Part name"
                                                className="bg-white text-[13px]"
                                                value={part.part_name}
                                                onChange={(e) => handlePartChange(idx, "part_name", e.target.value)}
                                                error={errors[`parts.${idx}.part_name`]}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Input
                                                label={idx === 0 ? "Vendor" : ""}
                                                placeholder="Vendor"
                                                className="bg-white text-[13px]"
                                                value={part.vendor}
                                                onChange={(e) => handlePartChange(idx, "vendor", e.target.value)}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Input
                                                label={idx === 0 ? "Buy Price" : ""}
                                                placeholder="0.00"
                                                type="number"
                                                className="bg-white text-[13px]"
                                                value={part.buy_price}
                                                onChange={(e) => handlePartChange(idx, "buy_price", e.target.value)}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Input
                                                label={idx === 0 ? "Sell Price" : ""}
                                                placeholder="0.00"
                                                type="number"
                                                className="bg-white text-[13px]"
                                                value={part.sell_price}
                                                onChange={(e) => handlePartChange(idx, "sell_price", e.target.value)}
                                            />
                                        </div>
                                        <div className="md:col-span-3 flex gap-3 items-end">
                                            <div className="grow space-y-1.5" />
                                            {data.parts.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removePartRow(index)}
                                                    className="inline-flex items-center justify-center w-9 h-9 text-slate-300 hover:text-rose-500 bg-white border border-slate-100 rounded-lg shadow-sm mb-[1px] transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Additional Notes */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-5 flex items-center gap-2">
                                <FileText size={18} className="text-[#FF9F43]" />
                                Additional Notes
                            </h3>
                            <Input
                                isTextArea
                                placeholder="Enter any specific requirements or notes..."
                                className="min-h-[160px] text-[13px] focus:ring-[#FF9F43]/10"
                                value={data.notes}
                                onChange={(e) => setData("notes", e.target.value)}
                            />
                        </div>

                        {/* Payment & Method Quick Toggle */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                             <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4">Payment Defaults</h4>
                             <p className="text-[11px] text-slate-500 mb-6 italic">These will be applied to all parts in this lead.</p>
                             
                             <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-slate-700">Default Method</label>
                                    <select 
                                        className="w-full h-10 bg-slate-50 border border-slate-100 rounded-lg px-3 text-[13px] focus:bg-white transition-all"
                                        onChange={(e) => {
                                            const updated = data.parts.map(p => ({...p, method: e.target.value}));
                                            setData("parts", updated);
                                        }}
                                    >
                                        <option>Cash</option>
                                        <option>Card</option>
                                        <option>Bank Transfer</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-slate-700">Default Payment Status</label>
                                    <select 
                                        className="w-full h-10 bg-slate-50 border border-slate-100 rounded-lg px-3 text-[13px] focus:bg-white transition-all"
                                        onChange={(e) => {
                                            const updated = data.parts.map(p => ({...p, payment_status: e.target.value}));
                                            setData("parts", updated);
                                        }}
                                    >
                                        <option>Pending</option>
                                        <option>Paid</option>
                                        <option>Partially Paid</option>
                                    </select>
                                </div>
                             </div>
                        </div>

                        {/* Form Submission */}
                        <div className="flex gap-3 pt-6 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-[#FF9F43] text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#e68a30] active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-[#FF9F43]/20"
                            >
                                <Save size={18} />
                                {processing ? "Updating..." : "Update Lead Info"}
                            </button>
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="w-20 bg-slate-100 text-slate-600 h-12 rounded-xl font-bold hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50"
                            >
                                Undo
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
