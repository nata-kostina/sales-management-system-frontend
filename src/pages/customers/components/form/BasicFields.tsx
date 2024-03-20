import { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { ICustomerFormValues } from "../../../../schemas/customer.form.schema";
import { ICustomer } from "../../../../models/entities/customer.interface";
import { InputText } from "../../../../components/ui/Inputs/InputText";
import { PhoneSelect } from "../../../../components/ui/Inputs/PhoneSelect";
import { CountryCitySelect } from "../../../../components/ui/Inputs/CountryCitySelect";

interface Props {
    register: UseFormRegister<ICustomerFormValues>;
    errors: FieldErrors<ICustomerFormValues>;
    control: Control<ICustomerFormValues>;
    customer: ICustomer | Omit<ICustomer, "id"> | null;
}

export const BasicFields: FC<Props> = ({ errors, register, control, customer }) => {
    return (
        <div className="fields-section fields-basic">
            <InputText
                name="name"
                label="Name"
                placeholder="John Smith"
                type="text"
                defaultValue={customer?.name ?? ""}
                error={errors.name?.message}
                register={register}
            />
            <InputText
                name="email"
                label="Email"
                placeholder=""
                type="text"
                defaultValue={customer?.email ?? ""}
                error={errors.email?.message}
                register={register}
            />
            <PhoneSelect defaultValue={customer?.phone} control={control} error={errors.phone?.message} label="Phone" />
            <CountryCitySelect
                defaultValue={customer ? {
                    city: customer.city,
                    country: customer.country,
                    state: customer.state,
                } : undefined}
                control={control}
            />
            <InputText
                name="address"
                label="Address"
                placeholder=""
                type="text"
                defaultValue={customer?.address ?? ""}
                error={errors.address?.message}
                register={register}
            />
        </div>
    );
};
