import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Section } from "../components/Section";
import { ProductForm } from "../components/FormProduct/ProductForm";
import { useFetch } from "../../../hooks/useFetch";
import { IGetProductResponse } from "../../../models/response/IGetProductResponse";
import { appService } from "../../../services";
import { IProduct } from "../../../models/product.interface";
import { IEditProductPayload } from "../../../models/request/IEditProductPayload";
import { IEditProductResponse } from "../../../models/response/IEditProductResponse";
import { IProductDto } from "../../../dtos/product/product.dto.interface";
import { Preloader } from "../../../components/ui/Preloader/Preloader";

export const ProductEditPage: FC = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<IProduct | null>(null);

    const [areFormFieldsLoading, setAreFormFieldsLoading] = useState(true);
    const [areFormOptionsLoading, setAreFormOptionsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isGetProductLoading, makeRequest: makeGetProductRequest } = useFetch<IGetProductResponse>(true);
    const { isLoading: isEditProductLoading, makeRequest: makeEditProductRequest } = useFetch<IEditProductResponse>();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const response = await makeGetProductRequest(() => {
                        return appService.products.getProduct({ id });
                    });
                    setProduct(response.product);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, []);

    useEffect(() => {
        setIsLoading(isGetProductLoading || isEditProductLoading || areFormOptionsLoading || areFormFieldsLoading);
    }, [isGetProductLoading, isEditProductLoading, areFormOptionsLoading, areFormFieldsLoading]);

    const changeIsFormLoading = (value: boolean) => {
        setAreFormFieldsLoading(value);
    };

    const changeAreFormOptionsLoading = (value: boolean) => {
        setAreFormOptionsLoading(value);
    };

    const handleSubmitForm = async (updatedProduct: IProductDto) => {
        try {
            if (id) {
                console.log({ ...updatedProduct });
                const payload: IEditProductPayload = {
                    id,
                    payload: {
                        ...updatedProduct,
                    },
                };
                const response = await makeEditProductRequest(() => {
                    console.log({ ...payload });
                    return appService.products.editProduct(payload);
                });
                console.log(response);
                setProduct(response.product);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isLoading && <Preloader />}
            {product &&
                (
                    <Section title="Edit product" name="section-products-edit" cl="form-layout-1">
                        <div className="card">
                            <div className="card__inner">
                                <div className="card__body">
                                    <ProductForm
                                        changeAreFormOptionsLoading={changeAreFormOptionsLoading}
                                        changeIsFormLoading={changeIsFormLoading}
                                        product={product}
                                        name="edit"
                                        submitBtn="Update item"
                                        handleSubmitForm={handleSubmitForm}
                                    />
                                </div>
                                <div className="card__footer" />
                            </div>
                        </div>
                    </Section>
                )}
        </>
    );
};
