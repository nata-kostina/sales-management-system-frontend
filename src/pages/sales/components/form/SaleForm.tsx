import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ISaleFormValues, saleFormSchema } from "../../../../schemas/sale.form.schema";
import { BasicFields } from "./basicFields/BasicFields";
import { useFetch } from "../../../../hooks/shared/useFetch";
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
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        clearErrors,
    } = useForm<ISaleFormValues>({
        resolver: yupResolver(saleFormSchema),
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

    useEffect(() => {
        if (sale) {
            setValue("products", sale.products);
        }
    }, [sale]);

    const onSubmit = handleSubmit((data) => {
        const saleDto = new SaleDto(data);
        logFormData(saleDto.formData);
        handleSubmitForm(saleDto.formData);
    });

    return (
        <form id="form-sale" className={`form form-items form-sale form-sale-${name}`} onSubmit={onSubmit}>
            <div className="form__inner">
                <div className="form__body">
                    <BasicFields
                        formOptions={formOptions}
                        errors={errors}
                        control={control}
                        sale={sale}
                    />
                    <div className="separator" />
                    <AdditionalFields
                        sale={sale}
                        errors={errors}
                        setValue={setValue}
                        control={control}
                        clearErrors={clearErrors}
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
