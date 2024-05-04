import { FC, useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import dayjs from "dayjs";
import { ISaleFormValues } from "../../../../../schemas/sale.form.schema";
import { SelectCustomer } from "./components/SelectCustomer";
import { ISale } from "../../../../../models/entities/sale.interface";
import { SelectSaleStatus } from "./components/SelectSaleStatus";
import { IGetSaleFormOptionsResponse } from "../../../../../models/responses/sales.response";
import { SelectPayment } from "./components/SelectPayment";
import { DatePicker } from "../../../../../components/ui/Inputs/DatePicker";
import { ICustomer } from "../../../../../models/entities/customer.interface";
import { appService } from "../../../../../services";
import { useFetch } from "../../../../../hooks/shared/useFetch";
import { IGetCustomerResponse } from "../../../../../models/responses/customer.response";
import { NonEditableInput } from "../../../../../components/ui/Inputs/NonEditableInput";
import { useModalOperationResult } from "../../../../../hooks/shared/useModalOperationResult";
import { content } from "../../../../../data/content";

interface Props {
    errors: FieldErrors<ISaleFormValues>;
    control: Control<ISaleFormValues>;
    sale: ISale | Omit<ISale, "id"> | null;
    formOptions: IGetSaleFormOptionsResponse;
}

export const BasicFields: FC<Props> = ({ errors, control, sale, formOptions: { statuses, payment } }) => {
    const { modalError } = useModalOperationResult();
    const { makeRequest: makeGetCustomerRequest } = useFetch<IGetCustomerResponse>(true);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(() => sale ? sale.customer : null);
    const fetchCustomer = async (id: string) => {
        try {
            const response = await makeGetCustomerRequest(() => {
                return appService.customer.getCustomer({ id });
            });
            setSelectedCustomer(response.customer);
        } catch (error) {
            modalError(content.error.notFound());
            setSelectedCustomer(null);
        }
    };
    const handleOnSelectCustomer = async (id: string): Promise<void> => {
        await fetchCustomer(id);
    };
    return (
        <div className="fields-section fields-basic">
            <SelectCustomer
                control={control}
                placeholder="Select Customer"
                label="Customer"
                name="customer"
                error={errors.customer?.message}
                handleOnChange={handleOnSelectCustomer}
                defaultValue={sale ? { label: sale.customer.name, value: sale.customer.id } : undefined}
            />
            <NonEditableInput
                label="Customer's e-mail"
                name="email"
                type="text"
                defaultValue={selectedCustomer?.email}
            />
            <NonEditableInput
                label="Customer's address"
                name="address"
                type="text"
                defaultValue={selectedCustomer ? `${selectedCustomer.address}, ${selectedCustomer.city.name}, ${selectedCustomer.country.name}` : ""}
            />
            <DatePicker
                control={control}
                label="Date"
                name="date"
                defaultValue={sale ? dayjs(sale.date) : undefined}
                error={errors.date?.message}
            />
            <SelectSaleStatus
                control={control}
                placeholder="Select Sale Status"
                label="Sale Status"
                name="status"
                statuses={statuses}
                error={errors.status?.message}
                defaultValue={sale ? { label: sale.status.name, value: sale.status.id } : undefined}

            />
            <SelectPayment
                control={control}
                placeholder="Select Payment"
                label="Sale Payment"
                name="payment"
                payment={payment}
                error={errors.payment?.message}
                defaultValue={sale ? { label: sale.payment.name, value: sale.payment.id } : undefined}
            />
        </div>
    );
};
