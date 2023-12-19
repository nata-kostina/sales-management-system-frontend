import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ConfigProvider } from "antd";
import { IProductFormValues, productFormSchema } from "../../../../schemas/product.form.schema";
import { BasicFields } from "./basicFields/BasicFields";
import { AdditionalFields } from "./additionalFields/AdditionalFields";
import foo from "../../../../styles/_vars.module.scss";
import { Routes } from "../../../../types/routes";
import { IProduct } from "../../../../models/product.interface";
import { useFetch } from "../../../../hooks/useFetch";
import { appService } from "../../../../services";
import { IGetProductsFormOptionsResponse } from "../../../../models/response/IGetProductsFormOptions";
import { IProductDto } from "../../../../dtos/product/product.dto.interface";

const { colorPrimary } = foo;

interface Props {
    name: string;
    submitBtn: string;
    product: IProduct | Omit<IProduct, "id"> | null;
    changeIsFormLoading: (value: boolean) => void;
    changeAreFormOptionsLoading: (value: boolean) => void;
    handleSubmitForm: (data: IProductDto) => void;
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
        control,
    } = useForm<IProductFormValues>({
        resolver: yupResolver(productFormSchema),
    });
    console.log({ ...errors });

    useEffect(() => {
        const fetchFormOptions = async () => {
            try {
                const response = await makeFormOptionsRequest(() => appService.products.getProductsFormOptions());
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
        console.log(data);
        const payload: IProductDto = {
            brand: data.brand,
            categories: data.categories ?? [],
            description: data.description ?? "",
            images: [],
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            sku: data.sku ?? null,
            unit: data.unit,
        };
        handleSubmitForm(payload);
    });

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary,
                },
            }}
        >
            <form className={`form form-product-${name}`} onSubmit={onSubmit}>
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
                            register={register}
                            errors={errors}
                            control={control}
                        />
                    </div>
                    <div className="form__footer">
                        <div className="user-actions">
                            <Link to={`../${Routes.Products}`} relative="route" className="btn btn-secondary">Cancel</Link>
                            <button type="submit" className="btn btn-primary">{submitBtn}</button>
                        </div>
                    </div>
                </div>
            </form>
        </ConfigProvider>
    );
};
