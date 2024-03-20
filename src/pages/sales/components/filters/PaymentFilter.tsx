import { FC, useState, useEffect } from "react";
import { SelectFilter } from "../../../../components/Table/SelectFilter";
import { useFetch } from "../../../../hooks/useFetch";
import { appService } from "../../../../services";
import { IGetPaymentResponse } from "../../../../models/responses/payment.response";
import { TableFilterValue } from "../../../../types/filters";

interface Props {
    onSelect: (value: TableFilterValue[] | null) => void;
    localFilter?: TableFilterValue[] | null;
    changeLocalFilter: (value: TableFilterValue[] | null) => void;
}

export const PaymentFilter: FC<Props> = ({ onSelect, localFilter, changeLocalFilter }) => {
    const { makeRequest, isLoading } = useFetch<IGetPaymentResponse>();
    const [options, setOptions] = useState<{ label: string; value: string; }[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await makeRequest(async () => appService.payment.getPayment());
            setOptions(response.payment.map((s) => ({ label: s.name, value: s.id })));
        };
        fetchData();
    }, []);

    return (
        <SelectFilter
            localFilter={localFilter}
            changeLocalFilter={changeLocalFilter}
            options={options}
            isLoading={isLoading}
            onSelect={onSelect}
        />
    );
};
