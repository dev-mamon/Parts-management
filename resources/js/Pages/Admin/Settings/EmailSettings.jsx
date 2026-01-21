import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/admin/input";
import { Save, Mail, Server, ShieldCheck, User, Settings } from "lucide-react";

export default function EmailSettings({ settings }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        mail_mailer: settings.mail_mailer || "smtp",
        mail_host: settings.mail_host || "mail.thesyndicates.team",
        mail_port: settings.mail_port || "465",
        mail_username: settings.mail_username || "support@thesyndicates.team",
        mail_password: settings.mail_password || "",
        mail_encryption: settings.mail_encryption || "ssl",
        mail_from_address: settings.mail_from_address || "support@thesyndicates.team",
        mail_from_name: settings.mail_from_name || "Lee Full Stack",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.settings.email.update"), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Email Settings" />

            <div className="p-6 bg-slate-50/50 min-h-screen font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <Settings className="text-[#FF9F43]" size={24} />
                            <span>Email Settings</span>
                        </h1>
                        <p className="text-slate-500 text-[13px] mt-1">
                            Configure your SMTP and global email settings for the system.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* SMTP Configuration Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <Server size={18} className="text-[#FF9F43]" />
                                SMTP Configuration
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Mail Mailer"
                                    value={data.mail_mailer}
                                    error={errors.mail_mailer}
                                    onChange={(e) => setData("mail_mailer", e.target.value)}
                                    placeholder="e.g. smtp"
                                    className="text-[13px]"
                                />
                                <Input
                                    label="Mail Host"
                                    value={data.mail_host}
                                    error={errors.mail_host}
                                    onChange={(e) => setData("mail_host", e.target.value)}
                                    placeholder="e.g. mail.example.com"
                                    className="text-[13px]"
                                />
                                <Input
                                    label="Mail Port"
                                    value={data.mail_port}
                                    error={errors.mail_port}
                                    onChange={(e) => setData("mail_port", e.target.value)}
                                    placeholder="e.g. 465 or 587"
                                    className="text-[13px]"
                                />
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">Encryption</label>
                                    <select 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] focus:bg-white focus:ring-2 focus:ring-[#FF9F43]/10 focus:border-[#FF9F43] transition-all outline-none"
                                        value={data.mail_encryption}
                                        onChange={(e) => setData("mail_encryption", e.target.value)}
                                    >
                                        <option value="null">None</option>
                                        <option value="ssl">SSL</option>
                                        <option value="tls">TLS</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Authentication Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <ShieldCheck size={18} className="text-[#FF9F43]" />
                                Authentication
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Username"
                                    value={data.mail_username}
                                    error={errors.mail_username}
                                    onChange={(e) => setData("mail_username", e.target.value)}
                                    placeholder="e.g. support@example.com"
                                    className="text-[13px]"
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    value={data.mail_password}
                                    error={errors.mail_password}
                                    onChange={(e) => setData("mail_password", e.target.value)}
                                    placeholder="Enter SMTP password"
                                    className="text-[13px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Sender Information Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <User size={18} className="text-[#FF9F43]" />
                                Sender Information
                            </h3>
                            
                            <div className="space-y-6">
                                <Input
                                    label="From Address"
                                    value={data.mail_from_address}
                                    error={errors.mail_from_address}
                                    onChange={(e) => setData("mail_from_address", e.target.value)}
                                    placeholder="e.g. no-reply@example.com"
                                    className="text-[13px]"
                                />
                                <Input
                                    label="From Name"
                                    value={data.mail_from_name}
                                    error={errors.mail_from_name}
                                    onChange={(e) => setData("mail_from_name", e.target.value)}
                                    placeholder="e.g. My Application"
                                    className="text-[13px]"
                                />
                            </div>
                        </div>

                        {/* Form Submission */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#FF9F43] text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#e68a30] active:scale-95 transition-all disabled:opacity-50"
                            >
                                {processing ? (
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                                ) : (
                                    <Save size={18} />
                                )}
                                Save Settings
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    clearErrors();
                                }}
                                className="w-full bg-slate-100 text-slate-600 h-12 rounded-xl font-bold hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50 text-[13px]"
                            >
                                Reset Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
