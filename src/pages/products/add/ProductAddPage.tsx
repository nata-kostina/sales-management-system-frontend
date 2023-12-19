import { FC, useEffect, useState } from "react";
import { Section } from "../components/Section";
import { ProductForm } from "../components/FormProduct/ProductForm";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { IProductDto } from "../../../dtos/product/product.dto.interface";
import { IAddProductResponse } from "../../../models/response/IAddProductResponse";
import { IProduct } from "../../../models/product.interface";
import { Preloader } from "../../../components/ui/Preloader/Preloader";

export const ProductAddPage: FC = () => {
    const [product, setProduct] = useState<Omit<IProduct, "id"> | null>(null);

    const [areFormFieldsLoading, setAreFormFieldsLoading] = useState(true);
    const [areFormOptionsLoading, setAreFormOptionsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isAddProductLoading, makeRequest: makeAddProductRequest } = useFetch<IAddProductResponse>();

    useEffect(() => {
        console.log({ isAddProductLoading, areFormOptionsLoading, areFormFieldsLoading });
        setIsLoading(isAddProductLoading || areFormOptionsLoading || areFormFieldsLoading);
    }, [isAddProductLoading, areFormOptionsLoading, areFormFieldsLoading]);

    const changeIsFormLoading = (value: boolean) => {
        setAreFormFieldsLoading(value);
    };

    const changeAreFormOptionsLoading = (value: boolean) => {
        setAreFormOptionsLoading(value);
    };

    const handleSubmitForm = async (newProduct: Omit<IProductDto, "id">) => {
        try {
            console.log({ ...newProduct });
            const response = await makeAddProductRequest(() => {
                return appService.products.addProduct({
                    product: newProduct,
                });
            });
            console.log(response);
            setProduct(response.product);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isLoading && <Preloader />}

            <Section title="Add product" name="section-products-add" cl="form-layout-1">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__body">
                            <ProductForm
                                changeAreFormOptionsLoading={changeAreFormOptionsLoading}
                                changeIsFormLoading={changeIsFormLoading}
                                product={product}
                                name="add"
                                submitBtn="Add item"
                                handleSubmitForm={handleSubmitForm}
                            />
                        </div>
                        <div className="card__footer" />
                    </div>
                </div>
            </Section>
        </>
    );
};
