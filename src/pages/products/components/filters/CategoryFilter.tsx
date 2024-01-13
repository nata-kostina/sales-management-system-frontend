import { FC, useState, useEffect } from "react";
import { useGetCategoryList } from "../../../../hooks/useGetCategoryList";
import { SelectFilter } from "../../../../components/Table/SelectFilter";

interface Props {
    isOpen: boolean;
    onSelect: (value: string) => void;
}

export const CategoryFilter: FC<Props> = ({ isOpen, onSelect }) => {
    const { fetchData, isLoading } = useGetCategoryList();
    const [options, setOptions] = useState<{ label: string; value: string; }[]>([]);

    useEffect(() => {
        const fetchCategoryList = async () => {
            if (isOpen) {
                const response = await fetchData();
                setOptions(response.categories.map((c) => ({ label: c.name, value: c.id })));
            }
        };
        fetchCategoryList();
    }, [isOpen]);

    return (
        <SelectFilter
            options={options}
            isLoading={isLoading}
            onSelect={onSelect}
        />
    );
};
