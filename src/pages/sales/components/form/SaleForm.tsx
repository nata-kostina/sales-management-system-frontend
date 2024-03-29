import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ISaleFormValues, getDefaultSaleValues, saleFormSchema } from "../../../../schemas/sale.form.schema";
import { BasicFields } from "./basicFields/BasicFields";
import { useFetch } from "../../../../hooks/useFetch";
import { appService } from "../../../../services";
import { SaleDto } from "../../../../dtos/sale.dto";
import { ISale } from "../../../../models/entities/sale.interface";
import { IGetSaleFormOptionsResponse } from "../../../../models/responses/sales.response";
import { AdditionalFields } from "./additionalFields/AdditionalFields";
import { logFormData } from "../../../../utils/helper";

interface Props {
    name: string;
    submitBtn: string;
    sale: ISale | Omit<ISale, "id"> | null;
    changeAreFormOptionsLoading: (value: boolean) => void;
    handleSubmitForm: (data: FormData) => Promise<void>;
}

export const SaleForm: FC<Props> = ({
    name, submitBtn, sale,
    changeAreFormOptionsLoading,
    handleSubmitForm,
}) => {
    const [formOptions, setFormOptions] = useState<IGetSaleFormOptionsResponse>(() => ({
        statuses: [],
        payment: [],
    }));

    const { makeRequest: makeFormOptionsRequest, isLoading: areFormOptionsLoading } = useFetch<IGetSaleFormOptionsResponse>(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        control,
    } = useForm<ISaleFormValues>({
        resolver: yupResolver(saleFormSchema),
        // defaultValues: getDefaultSaleValues(sale),
    });

    useEffect(() => {
        const fetchFormOptions = async () => {
            try {
                const response = await makeFormOptionsRequest(() => appService.sale.getSaleFormOptions());
                setFormOptions(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFormOptions();
    }, []);

    useEffect(() => {
        changeAreFormOptionsLoading(areFormOptionsLoading);
    }, [areFormOptionsLoading]);

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const saleDto = new SaleDto(data);
        logFormData(saleDto.formData);
        handleSubmitForm(saleDto.formData);
    });

    console.log(getValues());

    return (
        <form className={`form form-items form-sale form-sale-${name}`} onSubmit={onSubmit}>
            <div className="form__inner">
                <div className="form__body">
                    <BasicFields
                        formOptions={formOptions}
                        register={register}
                        errors={errors}
                        control={control}
                        sale={sale}
                    />
                    <div className="separator" />
                    <AdditionalFields
                        sale={sale}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        control={control}
                    />
                </div>
                <div className="form__footer">
                    <div className="user-actions">
                        <Link to="../" relative="route" className="btn btn-action btn-reset">Cancel</Link>
                        <button type="submit" className="btn btn-action btn-apply">{submitBtn}</button>
                    </div>
                </div>
            </div>
        </form>
    );
};
