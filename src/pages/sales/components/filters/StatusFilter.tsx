import { FC, useState, useEffect } from "react";
import { SelectFilter } from "../../../../components/Table/SelectFilter";
import { useFetch } from "../../../../hooks/useFetch";
import { IGetStatusesResponse } from "../../../../models/responses/saleStatuses.response";
import { appService } from "../../../../services";
import { TableFilterValue } from "../../../../types/filters";

interface Props {
    onSelect: (value: TableFilterValue[] | null) => void;
    localFilter?: TableFilterValue[] | null;
    changeLocalFilter: (value: TableFilterValue[] | null) => void;
}

export const StatusFilter: FC<Props> = ({ onSelect, changeLocalFilter, localFilter }) => {
    const { makeRequest, isLoading } = useFetch<IGetStatusesResponse>();
    const [options, setOptions] = useState<{ label: string; value: string; }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await makeRequest(async () => appService.statuses.getStatuses());
            setOptions(response.statuses.map((s) => ({ label: s.name, value: s.id })));
        };
        fetchData();
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
