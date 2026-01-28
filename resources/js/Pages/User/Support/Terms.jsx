import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function Terms() {
    return (
        <>
            <Head title="Terms of Service" />

            <div className="p-4 md:p-8 bg-[#F8F9FB] min-h-screen">
                <div className="max-w-9xl mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-12">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#AD0100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Terms of Service</h1>
                            <p className="text-slate-400 text-sm">Last updated: December 5, 2025</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using Auto Parts Hub B2B platform, you accept and agree to be bound by the terms and provision of this agreement.
                            </p>
                            <p className="mt-4">
                                If you do not agree to these terms, you should not use this platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">2. Business Account Requirements</h2>
                            <p>To use our B2B platform, you must:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Be a registered business entity</li>
                                <li>Provide valid tax identification information</li>
                                <li>Maintain accurate account and company information</li>
                                <li>Be authorized to make purchases on behalf of your company</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">3. Orders and Pricing</h2>
                            <p>
                                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason.
                            </p>
                            <p className="mt-4">
                                Prices are subject to change without notice. The price charged will be the price displayed at the time of order placement.
                            </p>
                            <p className="mt-4">
                                Bulk pricing and custom quotes are available for qualifying orders. Contact our sales team for details.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">4. Payment Terms</h2>
                            <p>
                                Payment is due at the time of order unless other arrangements have been made with our credit department.
                            </p>
                            <p className="mt-4">
                                Net 30 payment terms may be available for approved business accounts with established credit.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">5. Returns and Refunds</h2>
                            <p>
                                Returns are accepted within 30 days of delivery for unused items in original packaging. Electrical parts and special orders may not be eligible for return.
                            </p>
                            <p className="mt-4">
                                Refunds will be processed within 5-7 business days of receiving and inspecting returned items.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">6. Warranties</h2>
                            <p>
                                All parts are covered by manufacturer warranties. Warranty terms vary by brand and product type.
                            </p>
                            <p className="mt-4">
                                We do not provide additional warranties beyond those offered by the manufacturer.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">7. Limitation of Liability</h2>
                            <p>
                                Auto Parts Hub shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">8. Contact Information</h2>
                            <p>For questions about these Terms of Service, please contact us:</p>
                            <div className="mt-4 space-y-1">
                                <p>Email: legal@autopartshub.com</p>
                                <p>Phone: 1-800-AUTO-PARTS</p>
                                <p>Address: 123 Industrial Parkway, Suite 500, Detroit, MI 48201</p>
                            </div>
                        </section>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

Terms.layout = page => <UserLayout children={page} />;
