import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { X, Upload, ArrowUpRight } from "lucide-react";

export default function ReturnRequestModal({ isOpen, onClose, orders }) {
    if (!isOpen) return null;

    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: "",
        reason: "",
        description: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("orders.return.request"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 transition-all duration-300">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-300">
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-50 p-2 rounded-lg">
                            <Upload className="w-5 h-5 text-red-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">
                            New Return Request
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">
                            Select Order
                        </label>
                        <select
                            value={data.order_id}
                            onChange={(e) => setData("order_id", e.target.value)}
                            className="w-full border-gray-200 rounded-sm focus:ring-[#FF9F43] focus:border-[#FF9F43] text-sm font-medium"
                        >
                            <option value="">Choose an order to return</option>
                            {orders.map((order) => (
                                <option key={order.id} value={order.id}>
                                    Order #{order.order_number} - ${order.total_amount} ({new Date(order.created_at).toLocaleDateString()})
                                </option>
                            ))}
                        </select>
                        {errors.order_id && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.order_id}
                            </p>
                        )}
                        {orders.length === 0 && (
                            <p className="text-amber-600 text-[11px] mt-1 font-medium">
                                No eligible orders found for return.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">
                            Return Reason
                        </label>
                        <select
                            value={data.reason}
                            onChange={(e) => setData("reason", e.target.value)}
                            className="w-full border-gray-200 rounded-sm focus:ring-[#FF9F43] focus:border-[#FF9F43] text-sm font-medium"
                        >
                            <option value="">Select Reason</option>
                            <option value="Wrong part received">Wrong part received</option>
                            <option value="Damaged during shipping">Damaged during shipping</option>
                            <option value="Defective item">Defective item</option>
                            <option value="No longer needed">No longer needed</option>
                        </select>
                        {errors.reason && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.reason}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">
                            Description
                        </label>
                        <textarea
                            rows="3"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Please provide details about your return..."
                            className="w-full border-gray-200 rounded-sm focus:ring-[#FF9F43] focus:border-[#FF9F43] text-sm placeholder:text-gray-300"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="relative border-2 border-dashed border-gray-200 rounded-sm p-4 hover:bg-gray-50 transition-colors group">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-center">
                            {imagePreview ? (
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview}
                                        className="mx-auto h-20 w-auto rounded shadow-sm"
                                        alt="Preview"
                                    />
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setImagePreview(null);
                                            setData('image', null);
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-[#FF9F43]/10 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Upload className="w-4 h-4 text-[#FF9F43]" />
                                    </div>
                                    <p className="text-[11px] text-gray-500">
                                        Drop evidence or{" "}
                                        <span className="text-[#FF9F43] font-bold">
                                            browse
                                        </span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-2.5 border border-gray-200 rounded-full font-bold text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing || orders.length === 0}
                            className="flex-1 px-6 py-2.5 bg-[#FF9F43] text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#e68a30] transition-all disabled:opacity-50 text-sm"
                        >
                            {processing ? "Submitting..." : "Submit Request"}
                            {!processing && (
                                <ArrowUpRight className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
