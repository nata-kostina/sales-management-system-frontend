import { FC } from "react";
import { Control } from "react-hook-form";
import { ISaleFormValues } from "../../../../../../schemas/sale.form.schema";
import { AsyncSelect } from "../../../../../../components/ui/Inputs/AsyncSelect";
import { useFetch } from "../../../../../../hooks/useFetch";
import { IGetCustomersListResponse } from "../../../../../../models/responses/customer.response";
import { appService } from "../../../../../../services";
import { ISelectOption } from "../../../../../../types/ui.types";

interface Props {
    control: Control<ISaleFormValues>;
    error: string | undefined;
    name: keyof ISaleFormValues;
    label: string;
    placeholder: string;
    defaultValue?: ISelectOption<ISaleFormValues>;
    handleOnChange: (value: string) => Promise<void>;
}

export const SelectCustomer: FC<Props> = ({ defaultValue, ...rest }) => {
    const { makeRequest } = useFetch<IGetCustomersListResponse>();
    const fetchOptions = async (value: string) => {
        const response = await makeRequest(() => appService.customers.getCustomersList(value));
        return response.customers.map((c) => ({ key: c.id, label: c.name, value: c.id }));
    };
    return (
        <AsyncSelect<ISaleFormValues> defaultValue={defaultValue} fetchOptions={fetchOptions} debounceTimeout={400} {...rest} />
    );
};
