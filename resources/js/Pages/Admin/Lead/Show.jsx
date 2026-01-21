import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    Users, 
    ChevronLeft,
    Car,
    FileText,
    MapPin,
    Package,
    Mail,
    Phone,
    Info,
} from "lucide-react";

export default function Show({ lead }) {
    return (
        <AdminLayout>
            <Head title={`Lead Details - ${lead.shop_name}`} />

            <div className="p-6 bg-slate-50/50 min-h-screen font-sans">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#FF9F43]/10 rounded-2xl flex items-center justify-center text-[#FF9F43]">
                            <Users size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Lead: {lead.shop_name}</h1>
                            <p className="text-[13px] text-slate-500 mt-1">Detailed overview of lead requirements and parts.</p>
                        </div>
                    </div>
                    <Link
                        href={route("admin.leads.index")}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        <ChevronLeft size={16} /> Back to Leads
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Lead Information */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                             <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <Info size={18} className="text-[#FF9F43]" />
                                Lead Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Shop Name</label>
                                        <span className="text-[15px] font-bold text-slate-800">{lead.shop_name}</span>
                                    </div>
                                    <div>
                                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Requester Name</label>
                                        <span className="text-[15px] font-bold text-slate-800">{lead.name}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#FF9F43] shrink-0">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Email Address</label>
                                            <span className="text-[14px] font-semibold text-slate-700">{lead.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#FF9F43] shrink-0">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Contact Number</label>
                                            <span className="text-[14px] font-semibold text-slate-700">{lead.contact_number}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Specification */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <Car size={18} className="text-[#FF9F43]" />
                                Vehicle Specification
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="md:col-span-2">
                                    <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Vehicle</label>
                                    <span className="text-[15px] font-bold text-slate-900 tracking-tight">{lead.vehicle_info}</span>
                                </div>
                                <div>
                                    <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-1">VIN Number</label>
                                    <span className="text-[14px] font-semibold text-slate-700">{lead.vin || 'N/A'}</span>
                                </div>
                                <div>
                                    <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Engine Size</label>
                                    <span className="text-[14px] font-semibold text-slate-700">{lead.engine_size || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Requested Parts */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <Package size={18} className="text-[#FF9F43]" />
                                Requested Parts ({lead.parts.length})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-50 bg-slate-50/30">
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Part</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vendor</th>
                                            <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pricing</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {lead.parts.map((part) => (
                                            <tr key={part.id}>
                                                <td className="px-4 py-5">
                                                    <span className="text-[14px] font-bold text-slate-800">{part.part_name}</span>
                                                </td>
                                                <td className="px-4 py-5">
                                                    <span className="text-[13px] font-medium text-slate-600">{part.vendor || 'N/A'}</span>
                                                </td>
                                                <td className="px-4 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-medium text-slate-500">Buy: ${part.buy_price}</span>
                                                        <span className="text-[13px] font-bold text-[#FF9F43]">Sell: ${part.sell_price}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-[11px] font-medium text-slate-400">{part.method}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Service Location */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <MapPin size={18} className="text-[#FF9F43]" />
                                Service Location
                            </h3>
                            <div className="space-y-4">
                                <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <p className="text-[14px] font-semibold text-slate-700 leading-relaxed italic">
                                        {lead.street_address}, {lead.unit_number && `Unit ${lead.unit_number},`}
                                        <br />
                                        {lead.city}, {lead.province} {lead.postcode}
                                        <br />
                                        {lead.country}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Technical Notes */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                             <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <FileText size={18} className="text-[#FF9F43]" />
                                Technical Notes
                            </h3>
                            <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 min-h-[150px]">
                                <p className="text-[13px] text-slate-500 font-medium italic leading-relaxed">
                                    {lead.notes ? `"${lead.notes}"` : "No internal notes provided for this lead."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
