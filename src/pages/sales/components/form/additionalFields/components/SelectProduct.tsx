import { FC } from "react";
import { AsyncSelect } from "../../../../../../components/ui/Inputs/AsyncSelect";
import { useFetch } from "../../../../../../hooks/useFetch";
import { appService } from "../../../../../../services";
import { IGetProductsListResponse } from "../../../../../../models/responses/products.response";
import { ISelectOption } from "../../../../../../types/ui.types";

interface Props {
    name: keyof { product: string; };
    label: string;
    placeholder: string;
    defaultValue?: ISelectOption<{ product: string; }>;
    handleOnChange: (value: string) => Promise<void>;
    error?: string;
}

export const SelectProduct: FC<Props> = ({ ...rest }) => {
    const { makeRequest } = useFetch<IGetProductsListResponse>();
    const fetchOptions = async (value: string) => {
        const response = await makeRequest(() => appService.products.getProductsList(value));
        return response.products.map((c) => ({ label: c.name, value: c.id }));
    };

    return (
        <AsyncSelect<{ product: string; }> fetchOptions={fetchOptions} debounceTimeout={400} {...rest} />
    );
};
