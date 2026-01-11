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
            confirmButtonColor: "#FF9F43",
            cancelButtonColor: "#d33",
            confirmButtonText,
            cancelButtonText,
            customClass: {
                popup: "rounded-sm",
                confirmButton: "rounded-sm px-4 py-2 font-bold",
                cancelButton: "rounded-sm px-4 py-2 font-bold",
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
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-all font-bold text-sm"
        >
            <Trash2 size={16} />
            Delete Selected
        </button>
    );
}
