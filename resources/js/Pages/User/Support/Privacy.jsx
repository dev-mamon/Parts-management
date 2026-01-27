import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function Privacy() {
    return (
        <UserLayout>
            <Head title="Privacy Policy" />

            <div className="max-w-9xl mx-auto px-4 py-6">
                <div className="bg-white rounded-md border border-slate-100 shadow-sm p-8 md:p-12">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#AD0100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
                            <p className="text-slate-400 text-sm">Last updated: December 5, 2025</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-8 text-slate-600 leading-relaxed">
                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">1. Information We Collect</h2>
                            <p>We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Business name, contact information, and tax identification</li>
                                <li>Account credentials and profile information</li>
                                <li>Order history and purchasing preferences</li>
                                <li>Payment and billing information</li>
                                <li>Communications with our support team</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Process and fulfill your orders</li>
                                <li>Provide customer support and respond to inquiries</li>
                                <li>Send order confirmations, invoices, and shipping notifications</li>
                                <li>Improve our products, services, and platform functionality</li>
                                <li>Prevent fraud and maintain platform security</li>
                                <li>Send marketing communications (with your consent)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">3. Information Sharing</h2>
                            <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Service providers who assist with order fulfillment and shipping</li>
                                <li>Payment processors to handle transactions securely</li>
                                <li>Legal authorities when required by law</li>
                                <li>Business partners with your explicit consent</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">4. Data Security</h2>
                            <p>We implement appropriate technical and organizational measures to protect your information, including:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Encryption of sensitive data in transit and at rest</li>
                                <li>Regular security assessments and updates</li>
                                <li>Restricted access to personal information</li>
                                <li>Secure payment processing through PCI-compliant providers</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">5. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>Access and review your personal information</li>
                                <li>Request corrections to inaccurate data</li>
                                <li>Delete your account and associated data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Export your data in a portable format</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">6. Cookies and Tracking</h2>
                            <p>
                                We use cookies and similar technologies to improve your experience, analyze platform usage, and personalize content. You can control cookie settings through your browser preferences.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">7. Data Retention</h2>
                            <p>
                                We retain your information for as long as necessary to provide our services and comply with legal obligations. Order history and transaction records are maintained for 7 years for accounting purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-3">8. Contact Us</h2>
                            <p>If you have questions about this Privacy Policy or our data practices, please contact:</p>
                            <div className="mt-4 space-y-1">
                                <p>Email: privacy@autopartshub.com</p>
                                <p>Phone: 1-800-AUTO-PARTS</p>
                                <p>Address: 123 Industrial Parkway, Suite 500, Detroit, MI 48201</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
