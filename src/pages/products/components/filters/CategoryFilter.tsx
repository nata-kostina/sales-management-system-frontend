import { FC, useState, useEffect } from "react";
import { useGetCategoryList } from "../../../../hooks/useGetCategoryList";
import { SelectFilter } from "../../../../components/Table/SelectFilter";
import { TableFilterValue } from "../../../../types/filters";

interface Props {
    onSelect: (value: TableFilterValue[] | null) => void;
    localFilter?: TableFilterValue[] | null;
    changeLocalFilter: (value: TableFilterValue[] | null) => void;
}

export const CategoryFilter: FC<Props> = ({ onSelect, changeLocalFilter, localFilter }) => {
    const { fetchData, isLoading } = useGetCategoryList();
    const [options, setOptions] = useState<{ label: string; value: string; }[]>([]);

    useEffect(() => {
        const fetchCategoryList = async () => {
            const response = await fetchData();
            setOptions(response.categories.map((c) => ({ label: c.name, value: c.id })));
        };
        fetchCategoryList();
    }, []);

    return (
        <SelectFilter
            options={options}
            isLoading={isLoading}
            onSelect={onSelect}
            changeLocalFilter={changeLocalFilter}
            localFilter={localFilter}
        />
    );
};
