import { FC, useState, useEffect } from "react";
import { SelectFilter } from "../../../../components/Table/SelectFilter";
import { useGetUnitList } from "../../../../hooks/useGetUnitList";

interface Props {
    isOpen: boolean;
    onSelect: (value: string) => void;
}

export const UnitFilter: FC<Props> = ({ isOpen, onSelect }) => {
    const { fetchData, isLoading } = useGetUnitList();
    const [options, setOptions] = useState<{ label: string; value: string; }[]>([]);

    useEffect(() => {
        const fetchBrandList = async () => {
            if (isOpen) {
                const response = await fetchData();
                setOptions(response.units.map((c) => ({ label: c.name, value: c.id })));
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
