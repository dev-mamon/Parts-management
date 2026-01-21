import React from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";

export default function ConfirmDelete({
    id,
    routeName,
    title = "Are you sure?",
    text = "This action cannot be undone!",
    confirmButtonText = "Yes, delete it!",
    cancelButtonText = "Cancel",
}) {
    const handleClick = () => {
        Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444", 
            cancelButtonColor: "#94A3B8",
            confirmButtonText,
            cancelButtonText,
            customClass: {
                popup: "rounded-2xl border-none shadow-xl",
                confirmButton: "rounded-lg px-5 py-2 font-semibold text-sm",
                cancelButton: "rounded-lg px-5 py-2 font-semibold text-sm",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route(routeName, id), {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-rose-600 hover:bg-white bg-transparent border border-transparent hover:border-slate-200 rounded-lg transition-all duration-200"
        >
            <Trash2 size={15} />
        </button>
    );
}
