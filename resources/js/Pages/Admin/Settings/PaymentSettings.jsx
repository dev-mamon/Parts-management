import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/admin/input";
import { Save, ShieldCheck, CreditCard, Settings } from "lucide-react";

export default function PaymentSettings({ settings }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        stripe_publishable_key: settings.stripe_publishable_key || "",
        stripe_secret_key: settings.stripe_secret_key || "",
        stripe_webhook_secret: settings.stripe_webhook_secret || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.settings.payment.update"), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Payment Settings" />

            <div className="p-6 bg-slate-50/50 min-h-screen font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <CreditCard className="text-[#FF9F43]" size={24} />
                            <span>Payment Settings</span>
                        </h1>
                        <p className="text-slate-500 text-[13px] mt-1">
                            Configure your Stripe payment gateway credentials.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Stripe Configuration Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <ShieldCheck size={18} className="text-[#FF9F43]" />
                                Stripe API Credentials
                            </h3>
                            
                            <div className="space-y-6">
                                <Input
                                    label="Stripe Publishable Key"
                                    value={data.stripe_publishable_key}
                                    error={errors.stripe_publishable_key}
                                    onChange={(e) => setData("stripe_publishable_key", e.target.value)}
                                    placeholder="pk_test_..."
                                    className="text-[13px]"
                                />
                                <Input
                                    label="Stripe Secret Key"
                                    type="password"
                                    value={data.stripe_secret_key}
                                    error={errors.stripe_secret_key}
                                    onChange={(e) => setData("stripe_secret_key", e.target.value)}
                                    placeholder="sk_test_..."
                                    className="text-[13px]"
                                />
                                <Input
                                    label="Stripe Webhook Secret"
                                    type="password"
                                    value={data.stripe_webhook_secret}
                                    error={errors.stripe_webhook_secret}
                                    onChange={(e) => setData("stripe_webhook_secret", e.target.value)}
                                    placeholder="whsec_..."
                                    className="text-[13px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Helper Information Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                <Settings size={18} className="text-[#FF9F43]" />
                                Quick Guide
                            </h3>
                            
                            <div className="space-y-4 text-[13px] text-slate-500 leading-relaxed">
                                <p>
                                    You can find your API keys in the <strong>Stripe Dashboard</strong> under Developers &gt; API keys.
                                </p>
                                <p>
                                    For Webhooks, you'll need to create a webhook endpoint pointing to your application's webhook URL and copy the <strong>Signing Secret</strong>.
                                </p>
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
                                Save Credentials
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
