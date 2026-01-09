import { useState, useCallback } from "react";
import { router } from "@inertiajs/react";
import debounce from "lodash/debounce";

// Saya menambahkan default value [] untuk data agar tidak error .length
export function TableManager(routeName, data = [], filters = {}) {
    const [search, setSearch] = useState(filters?.search || "");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAllGlobal, setSelectAllGlobal] = useState(false);

    const performQuery = useCallback(
        debounce((params) => {
            router.get(route(routeName), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            });
        }, 500),
        [routeName]
    );

    const handleSearch = (value) => {
        setSearch(value);
        setIsLoading(true);
        performQuery({ ...filters, search: value, page: 1 });
    };

    const toggleSelectAll = () => {
        if (!data || data.length === 0) return;

        if (selectedIds.length === data.length) {
            setSelectedIds([]);
            setSelectAllGlobal(false);
        } else {
            setSelectedIds(data.map((item) => item.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectAllGlobal(false);
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const clearSelection = () => {
        setSelectedIds([]);
        setSelectAllGlobal(false);
    };

    return {
        search,
        handleSearch,
        isLoading,
        selectedIds,
        toggleSelectAll,
        toggleSelect,
        selectAllGlobal,
        setSelectAllGlobal,
        clearSelection,
    };
}
