import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function ReturnPolicy() {
    const policies = [
        "Customer is responsible to inspect all parts prior to installation.",
        "Original sales invoice must accompany all returns.",
        "Warranty is not transferrable.",
        "Prior to any work being performed, approval for all repairs or replacements must be approved by PARTS PANEL AUTOMOTIVE.",
        "All parts sold is within the range of interchangeability and may not necessarily be exact year and model as the vehicle information that has been provided.",
        "Glass breakage is not covered by the warranty. Eg. windshield, back glass, quarter glass, unless expressly stated on the invoice.",
        "Parts that are sold may or may not have clips/fasteners.",
        "PARTS PANEL AUTOMOTIVE will not be held responsible for any loss of revenue or profit due to any/all product failure.",
        "PARTS PANEL AUTOMOTIVE will not be held responsible in any way for injury or damages incurred during as a result of installation of our part.",
        "It is installer’s responsibility to fully drain and replace fluids, antifreeze, lubricants, and filters that are approved by the vehicle manufacturer.",
        "Ball joints, wheel bearing, tie rod ends, bushing related to suspension and steering components are not covered by our warranty and should be inspected and changed by the installer.",
        "MODULES: Computer modules often require re-programming when replacing.",
        "TRANSFER CASE: Must replace with new oil, seals, gasket before installing the part.",
    ];

    return (
        <>
            <Head title="Return Policy" />

            <div className="p-4 md:p-8 bg-[#F8F9FB] min-h-screen">
                <div className="max-w-9xl mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-12">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#AD0100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Return Policy</h1>
                            <p className="text-slate-400 text-sm">Last updated: December 5, 2025</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 text-slate-600 leading-relaxed">
                        {policies.map((policy, index) => (
                            <section key={index}>
                                <h2 className="text-md font-bold text-slate-900 mb-2">{index + 1}. {policy.split(':')[0]}</h2>
                                <p>{policy.includes(':') ? policy.split(':')[1].trim() : policy}</p>
                            </section>
                        ))}

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-2">14. ENGINE</h2>
                            <p>Warranty will only cover block and header assembly. Parts that come with engine such as water pump, fuel pump, ignition system, etc. are not covered by warranty, unless expressly stated on front of the invoice. Must have new oil and filter recommended by the factory specification prior upon installation. Must replace seal before installation, and our warranty does not cover seal. Claims relating to overheating and/or improper lubrication or its components are not covered by our warranty.</p>
                        </section>

                        <section>
                            <h2 className="text-md font-bold text-slate-900 mb-2">15. TRANSMISSION</h2>
                            <p>Installer must replace with new seals, pan gasket, oil, filter and reset or replace computer codes when installing a transmission. Installer must replace radiator or transmission oil cooler, cooler must be cleansed and flushed before installing the transmission.</p>
                        </section>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

ReturnPolicy.layout = page => <UserLayout children={page} />;
