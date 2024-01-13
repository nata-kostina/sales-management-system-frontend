import { FC, useState, useEffect } from "react";
import { SelectFilter } from "../../../../components/Table/SelectFilter";
import { useGetBrandList } from "../../../../hooks/useGetBrandList";

interface Props {
    isOpen: boolean;
    onSelect: (value: string) => void;
}

export const BrandFilter: FC<Props> = ({ isOpen, onSelect }) => {
    const { fetchData, isLoading } = useGetBrandList();
    const [options, setOptions] = useState<{ label: string; value: string; }[]>([]);

    useEffect(() => {
        const fetchBrandList = async () => {
            if (isOpen) {
                const response = await fetchData();
                setOptions(response.brands.map((c) => ({ label: c.name, value: c.id })));
            }
        };
        fetchBrandList();
    }, [isOpen]);

    return (
        <SelectFilter
            options={options}
            isLoading={isLoading}
            onSelect={onSelect}
        />
    );
};
