import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { router } from "@inertiajs/react";
import debounce from "lodash/debounce";

export function TableManager(routeName, data = [], initialFilters = {}) {
    const [search, setSearch] = useState(initialFilters?.search || "");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingType, setLoadingType] = useState(null); 
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAllGlobal, setSelectAllGlobal] = useState(false);
    const [currentFilters, setCurrentFilters] = useState(initialFilters);

    const debouncedQuery = useRef(
        debounce((params, type) => {
            router.get(route(routeName), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                ...(initialFilters?.only
                    ? { only: [...new Set([...initialFilters.only, "flash", "errors"])] }
                    : {}),
                onStart: () => {
                    setIsLoading(true);
                    setLoadingType(type);
                },
                onFinish: () => {
                    setIsLoading(false);
                    setLoadingType(null);
                },
            });
        }, 100) // Extreme Performance: 100ms for near-instant response
    ).current;

    const performQuery = useCallback((updates = {}, type = 'filter') => {
        const newFilters = { ...currentFilters, ...updates };
        Object.keys(newFilters).forEach(key => {
            if (newFilters[key] === null || newFilters[key] === undefined || newFilters[key] === '') {
                delete newFilters[key];
            }
        });
        setCurrentFilters(newFilters);
        debouncedQuery(newFilters, type);
    }, [currentFilters, debouncedQuery]);

    const handleSearch = useCallback((value) => {
        setSearch(value);
        performQuery({ search: value || null, page: 1 }, 'search');
    }, [performQuery]);

    const handleFilterChange = useCallback((updates) => {
        performQuery({ ...updates, page: 1 }, 'filter');
    }, [performQuery]);

    const handleClearFilters = useCallback(() => {
        setSearch("");
        performQuery({ page: 1, status: null, category: null, sub_category: null, search: null }, 'search'); 
    }, [performQuery]);

    const toggleSelectAll = useCallback(() => {
        if (!data || data.length === 0) return;
        if (selectAllGlobal || selectedIds.length === data.length) {
            setSelectedIds([]);
            setSelectAllGlobal(false);
        } else {
            const allIds = data.map((item) => item.id);
            setSelectedIds(allIds);
        }
    }, [data, selectedIds.length, selectAllGlobal]);

    const toggleSelect = useCallback((id) => {
        setSelectAllGlobal(false);
        setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedIds([]);
        setSelectAllGlobal(false);
    }, []);

    useEffect(() => {
        if (selectAllGlobal) return;
        const dataIds = data?.map(item => item.id) || [];
        setSelectedIds(prev => prev.filter(id => dataIds.includes(id)));
    }, [data, selectAllGlobal]);

    return {
        search, handleSearch, isLoading, loadingType,
        selectedIds, toggleSelectAll, toggleSelect,
        selectAllGlobal, setSelectAllGlobal, clearSelection,
        handleFilterChange, handleClearFilters, currentFilters, performQuery,
    };
}
