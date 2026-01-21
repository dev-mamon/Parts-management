import React from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";

export default function ConfirmBulkDelete({
    selectedIds,
    selectAllGlobal,
    totalCount,
    search,
    routeName,
    onSuccess,
    title = "Are you sure?",
    confirmButtonText = "Yes, delete selected!",
    cancelButtonText = "Cancel",
}) {
    const handleBulkDelete = () => {
        const count = selectAllGlobal ? totalCount : selectedIds.length;
        const text = `${count} items will be deleted and this action cannot be undone!`;

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
                router.delete(route(routeName), {
                    data: {
                        ids: selectedIds,
                        all: selectAllGlobal,
                        search: search,
                    },
                    preserveScroll: true,
                    onSuccess: () => {
                        if (onSuccess) onSuccess();
                    },
                });
            }
        });
    };

    return (
        <button
            type="button"
            onClick={handleBulkDelete}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg hover:bg-rose-600 hover:text-white transition-all duration-200 font-bold text-[13px] shadow-sm"
        >
            <Trash2 size={16} />
            Delete Selected
        </button>
    );
}
