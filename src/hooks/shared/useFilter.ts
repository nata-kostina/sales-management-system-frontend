import { SorterResult } from "antd/es/table/interface";
import { useState } from "react";
import { TableFilter, TableFilterValue } from "../../types/filters";

export function useFilter<T extends object, F extends string>(): {
    filter: TableFilter<F>;
    sorter?: SorterResult<T>;
    openFilter: Record<string, boolean>;
    handleFilterSearch: (key: F, value: TableFilterValue | TableFilterValue[] | null) => void;
    handleSortChange: (_sorter: SorterResult<T>) => void;
    handleToggleFilter: (visible: boolean, key: string) => void;
    changeFilter: (value: TableFilter<F>) => void;
} {
    const [filter, setFilter] = useState<TableFilter<F>>({} as TableFilter<F>);
    const [sorter, setSorter] = useState<SorterResult<T>>();
    const [openFilter, setOpenFilter] = useState<Record<string, boolean>>({});
    const handleFilterSearch = (key: F, value: TableFilterValue | TableFilterValue[] | null) => {
        setOpenFilter((prev) => ({ ...prev, [key]: false }));
        setFilter((prev) => ({ ...prev, [key]: value }));
    };
    const handleSortChange = (_sorter: SorterResult<T>) => setSorter(_sorter);

    const handleToggleFilter = (visible: boolean, key: string) =>
        setOpenFilter((prev) => ({ ...prev, [key]: visible }));

    const changeFilter = (value: TableFilter<F>) => setFilter(value);

    return {
        filter,
        changeFilter,
        handleFilterSearch,
        handleSortChange,
        handleToggleFilter,
        openFilter,
        sorter,
    };
}
