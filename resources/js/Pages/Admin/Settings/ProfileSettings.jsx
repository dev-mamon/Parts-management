import React, { useRef } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/admin/input";
import { Save, User, Lock, Camera, ShieldCheck, Mail, Phone } from "lucide-react";

export default function ProfileSettings({ user }) {
    // Profile Identity Form
    const { 
        data: profileData, 
        setData: setProfileData, 
        post: postProfile, 
        processing: profileProcessing, 
        errors: profileErrors,
        reset: resetProfile
    } = useForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        profile_photo: null,
        _method: 'POST'
    });

    // Password Form
    const { 
        data: passwordData, 
        setData: setPasswordData, 
        post: postPassword, 
        processing: passwordProcessing, 
        errors: passwordErrors,
        reset: resetPassword
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const fileInputRef = useRef();

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        postProfile(route("admin.settings.profile.update"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        postPassword(route("admin.settings.profile.password"), {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <AdminLayout>
            <Head title="Profile Settings" />

            <div className="p-6 bg-slate-50/50 min-h-screen font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <User className="text-[#FF9F43]" size={24} />
                            <span>Profile Settings</span>
                        </h1>
                        <p className="text-slate-500 text-[13px] mt-1">
                            Manage your personal information and account security.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN: Personal Info & Avatar */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleProfileSubmit} className="space-y-8">
                            {/* Identity Card */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                                <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                    <ShieldCheck size={18} className="text-[#FF9F43]" />
                                    Personal Information
                                </h3>

                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Avatar Section */}
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="relative group">
                                            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 flex items-center justify-center">
                                                {profileData.profile_photo ? (
                                                    <img 
                                                        src={URL.createObjectURL(profileData.profile_photo)} 
                                                        className="w-full h-full object-cover"
                                                        alt="Preview"
                                                    />
                                                ) : user.profile_photo ? (
                                                    <img 
                                                        src={`/${user.profile_photo}`} 
                                                        className="w-full h-full object-cover"
                                                        alt="Profile"
                                                    />
                                                ) : (
                                                    <User size={48} className="text-slate-300" />
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                                className="absolute -bottom-2 -right-2 bg-[#FF9F43] text-white p-2 rounded-xl shadow-lg hover:bg-[#e68a30] transition-all active:scale-95"
                                            >
                                                <Camera size={16} />
                                            </button>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-medium">JPG, PNG (Max 2MB)</p>
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            ref={fileInputRef}
                                            accept="image/*"
                                            onChange={(e) => setProfileData("profile_photo", e.target.files[0])}
                                        />
                                        {profileErrors.profile_photo && (
                                            <p className="text-rose-500 text-[11px] text-center italic">{profileErrors.profile_photo}</p>
                                        )}
                                    </div>

                                    {/* Fields */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <Input
                                            label="First Name"
                                            value={profileData.first_name}
                                            error={profileErrors.first_name}
                                            onChange={(e) => setProfileData("first_name", e.target.value)}
                                            className="text-[13px]"
                                        />
                                        <Input
                                            label="Last Name"
                                            value={profileData.last_name}
                                            error={profileErrors.last_name}
                                            onChange={(e) => setProfileData("last_name", e.target.value)}
                                            className="text-[13px]"
                                        />
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Email Address"
                                                type="email"
                                                value={profileData.email}
                                                readOnly
                                                className="text-[13px] bg-slate-50 cursor-not-allowed text-slate-500"
                                                icon={<Mail size={14} className="text-slate-400" />}
                                                helpText="Email address cannot be changed."
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Phone Number"
                                                value={profileData.phone_number}
                                                error={profileErrors.phone_number}
                                                onChange={(e) => setProfileData("phone_number", e.target.value)}
                                                className="text-[13px]"
                                                icon={<Phone size={14} className="text-slate-400" />}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={profileProcessing}
                                        className="bg-[#FF9F43] text-white px-8 py-3 rounded-xl font-bold text-[14px] flex items-center gap-2 hover:bg-[#e68a30] transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Password Update */}
                    <div className="lg:col-span-4 space-y-8">
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                                <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                                    <Lock size={18} className="text-[#FF9F43]" />
                                    Change Password
                                </h3>
                                
                                <div className="space-y-6">
                                    <Input
                                        label="Current Password"
                                        type="password"
                                        value={passwordData.current_password}
                                        error={passwordErrors.current_password}
                                        onChange={(e) => setPasswordData("current_password", e.target.value)}
                                        className="text-[13px]"
                                    />
                                    <Input
                                        label="New Password"
                                        type="password"
                                        value={passwordData.password}
                                        error={passwordErrors.password}
                                        onChange={(e) => setPasswordData("password", e.target.value)}
                                        className="text-[13px]"
                                    />
                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        value={passwordData.password_confirmation}
                                        error={passwordErrors.password_confirmation}
                                        onChange={(e) => setPasswordData("password_confirmation", e.target.value)}
                                        className="text-[13px]"
                                    />
                                </div>

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        disabled={passwordProcessing}
                                        className="w-full bg-[#FF9F43] text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#e68a30] active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {passwordProcessing ? (
                                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                                        ) : (
                                            <Lock size={18} />
                                        )}
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Note Card */}
                        <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
                             <h4 className="text-[12px] font-bold text-[#e68a30] mb-2 uppercase tracking-wider">Security Tip</h4>
                             <p className="text-[12px] text-slate-600 leading-relaxed">
                                Always use a strong, unique password. We recommend a mix of uppercase, lowercase letters, numbers, and special characters.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
