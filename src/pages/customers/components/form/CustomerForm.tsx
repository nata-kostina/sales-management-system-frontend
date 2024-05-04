import { FC } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BasicFields } from "./BasicFields";
import { ICustomer } from "../../../../models/entities/customer.interface";
import { ICustomerFormValues, customerFormSchema } from "../../../../schemas/customer.form.schema";
import { CustomerDto } from "../../../../dtos/customer.dto";

interface Props {
    name: string;
    submitBtn: string;
    customer: ICustomer | Omit<ICustomer, "id"> | null;
    handleSubmitForm: (data: FormData) => Promise<void>;
}

export const CustomerForm: FC<Props> = ({
    name, submitBtn, customer,
    handleSubmitForm,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues,
    } = useForm<ICustomerFormValues>({
        resolver: yupResolver(customerFormSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const customerDto = new CustomerDto(data);
        handleSubmitForm(customerDto.formData);
    });
    console.log({ customer });
    console.log({ values: getValues() });
    return (
        <form className={`form form-items form-customer form-customer-${name}`} onSubmit={onSubmit}>
            <div className="form__inner">
                <div className="form__body">
                    <BasicFields
                        register={register}
                        errors={errors}
                        control={control}
                        customer={customer}
                    />
                </div>
                <div className="form__footer">
                    <div className="user-actions">
                        <Link to=".." relative="route" className="btn btn-action btn-reset">Cancel</Link>
                        <button type="submit" className="btn btn-action btn-apply">{submitBtn}</button>
                    </div>
                </div>
            </div>
        </form>
    );
};
