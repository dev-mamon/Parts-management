import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, useForm } from "@inertiajs/react";
import { 
    Phone, 
    Mail, 
    MapPin, 
    MessageCircle,
    Send,
    ChevronDown
} from "lucide-react";

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        order_id: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contact.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <UserLayout>
            <Head title="Contact Us" />

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Contact info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <h2 className="text-xl font-bold text-gray-900 mb-8">Contact Information</h2>
                            
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shrink-0">
                                        <Phone size={22} />
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                                        <p className="text-[15px] font-bold text-gray-800 tracking-tight">(1-800-288-6727)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                        <Mail size={22} />
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                        <p className="text-[15px] font-bold text-gray-800 tracking-tight">support@autopartshub.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                        <MapPin size={22} />
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Address</p>
                                        <p className="text-[15px] font-bold text-gray-800 tracking-tight leading-snug">
                                            123 Industrial Parkway Suite 500
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-6 md:p-10 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
                                    <MessageCircle size={20} />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Send us a Message</h1>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-bold text-gray-700 ml-1">First Name</label>
                                        <input 
                                            type="text"
                                            placeholder="Jane"
                                            value={data.first_name}
                                            onChange={e => setData("first_name", e.target.value)}
                                            className={`w-full h-12 bg-gray-50 border ${errors.first_name ? 'border-rose-400' : 'border-gray-100'} rounded-xl px-4 text-[15px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none`}
                                        />
                                        {errors.first_name && <p className="text-rose-500 text-[12px] mt-1 ml-1">{errors.first_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-bold text-gray-700 ml-1">Last Name</label>
                                        <input 
                                            type="text"
                                            placeholder="Morgan"
                                            value={data.last_name}
                                            onChange={e => setData("last_name", e.target.value)}
                                            className={`w-full h-12 bg-gray-50 border ${errors.last_name ? 'border-rose-400' : 'border-gray-100'} rounded-xl px-4 text-[15px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none`}
                                        />
                                        {errors.last_name && <p className="text-rose-500 text-[12px] mt-1 ml-1">{errors.last_name}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-bold text-gray-700 ml-1">Email</label>
                                        <input 
                                            type="email"
                                            placeholder="Janemorgan@gmail.com"
                                            value={data.email}
                                            onChange={e => setData("email", e.target.value)}
                                            className={`w-full h-12 bg-gray-50 border ${errors.email ? 'border-rose-400' : 'border-gray-100'} rounded-xl px-4 text-[15px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none`}
                                        />
                                        {errors.email && <p className="text-rose-500 text-[12px] mt-1 ml-1">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-bold text-gray-700 ml-1">Phone Number</label>
                                        <input 
                                            type="text"
                                            placeholder="+880 01521 436 585"
                                            value={data.phone}
                                            onChange={e => setData("phone", e.target.value)}
                                            className={`w-full h-12 bg-gray-50 border ${errors.phone ? 'border-rose-400' : 'border-gray-100'} rounded-xl px-4 text-[15px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none`}
                                        />
                                        {errors.phone && <p className="text-rose-500 text-[12px] mt-1 ml-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-gray-700 ml-1">Order ID (Optional)</label>
                                    <input 
                                        type="text"
                                        placeholder="ORD-XXXX"
                                        value={data.order_id}
                                        onChange={e => setData("order_id", e.target.value)}
                                        className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-[15px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-2 relative">
                                    <label className="text-[14px] font-bold text-gray-700 ml-1">Subject</label>
                                    <select 
                                        value={data.subject}
                                        onChange={e => setData("subject", e.target.value)}
                                        className={`w-full h-12 bg-gray-50 border ${errors.subject ? 'border-rose-400' : 'border-gray-100'} rounded-xl px-4 text-[15px] appearance-none focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none`}
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Order Support">Order Support</option>
                                        <option value="Return Request">Return Request</option>
                                        <option value="Technical Issue">Technical Issue</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {errors.subject && <p className="text-rose-500 text-[12px] mt-1 ml-1">{errors.subject}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-gray-700 ml-1">Message</label>
                                    <textarea 
                                        rows="6"
                                        placeholder="Please describe your inquiry in detail..."
                                        value={data.message}
                                        onChange={e => setData("message", e.target.value)}
                                        className={`w-full bg-gray-50 border ${errors.message ? 'border-rose-400' : 'border-gray-100'} rounded-2xl p-4 text-[15px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none resize-none`}
                                    />
                                    {errors.message && <p className="text-rose-500 text-[12px] mt-1 ml-1">{errors.message}</p>}
                                </div>
                                <div className="px-6 md:px-8 py-8 flex justify-end gap-4">
                                    <button className="flex items-center gap-3 bg-[#FF9F43] text-white pl-8 pr-3 py-3 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-orange-100 transition-all active:scale-95 group">
                                        Send Message
                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                         <Send className="w-4 h-4" />
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </UserLayout>
    );
}
