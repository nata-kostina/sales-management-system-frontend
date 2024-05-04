import { FC, useState, useEffect } from "react";
import { SelectFilter } from "../../../../components/Table/SelectFilter";
import { useGetBrandList } from "../../../../hooks/useGetBrandList";
import { TableFilterValue } from "../../../../types/filters";

interface Props {
    onSelect: (value: TableFilterValue[] | null) => void;
    localFilter?: TableFilterValue[] | null;
    changeLocalFilter: (value: TableFilterValue[] | null) => void;
}

export const BrandFilter: FC<Props> = ({ changeLocalFilter, localFilter, onSelect }) => {
    const { fetchData, isLoading } = useGetBrandList();
    const [options, setOptions] = useState<{ label: string; value: string; }[]>([]);

    useEffect(() => {
        const fetchBrandList = async () => {
            console.log("fetchBrandList");
            const response = await fetchData();
            setOptions(response.brands.map((c) => ({ label: c.name, value: c.id })));
        };
        fetchBrandList();
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
