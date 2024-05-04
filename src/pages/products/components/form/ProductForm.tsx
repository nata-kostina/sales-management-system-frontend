import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IProductFormValues, productFormSchema } from "../../../../schemas/product.form.schema";
import { BasicFields } from "./basicFields/BasicFields";
import { AdditionalFields } from "./additionalFields/AdditionalFields";
import { useFetch } from "../../../../hooks/shared/useFetch";
import { appService } from "../../../../services";
import { ProductDto } from "../../../../dtos/product.dto";
import { IProduct } from "../../../../models/entities/product.interface";
import { IGetProductsFormOptionsResponse } from "../../../../models/responses/products.response";

interface Props {
    name: string;
    submitBtn: string;
    product: IProduct | Omit<IProduct, "id"> | null;
    changeIsFormLoading: (value: boolean) => void;
    changeAreFormOptionsLoading: (value: boolean) => void;
    handleSubmitForm: (data: FormData) => Promise<void>;
}

export const ProductForm: FC<Props> = ({
    name, submitBtn, product,
    changeIsFormLoading,
    changeAreFormOptionsLoading,
    handleSubmitForm,
}) => {
    const [formOptions, setFormOptions] = useState<IGetProductsFormOptionsResponse>(() => ({
        brands: [],
        categories: [],
        units: [],
    }));

    const { makeRequest: makeFormOptionsRequest, isLoading: areFormOptionsLoading } = useFetch<IGetProductsFormOptionsResponse>(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<IProductFormValues>({
        resolver: yupResolver(productFormSchema),
    });

    useEffect(() => {
        const fetchFormOptions = async () => {
            try {
                const response = await makeFormOptionsRequest(() => appService.product.getProductsFormOptions());
                response.units.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                response.brands.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                response.brands.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
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
        const productDto = new ProductDto(data);
        handleSubmitForm(productDto.formData);
    });
    return (
        <form id="form-product" className={`form form-items form-product form-product-${name}`} onSubmit={onSubmit}>
            <div className="form__inner">
                <div className="form__body">
                    <BasicFields
                        formOptions={formOptions}
                        register={register}
                        errors={errors}
                        control={control}
                        product={product}
                    />
                    <div className="separator" />
                    <AdditionalFields
                        changeIsFormLoading={changeIsFormLoading}
                        product={product}
                        errors={errors}
                        control={control}
                        setValue={setValue}
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
