import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { ProductForm } from "../components/form/ProductForm";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { IProduct } from "../../../models/entities/product.interface";
import { IGetProductResponse, IEditProductResponse } from "../../../models/responses/products.response";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { Sections } from "../../../types/entities";
import { getDisplayedValueFromItems } from "../../../utils/helper";

export const ProductEditPage: FC = () => {
    const { id } = useParams();

    const { modalSuccess, modalError } = useModalOperationResult();

    const [product, setProduct] = useState<IProduct | null>(null);

    const [areFormFieldsLoading, setAreFormFieldsLoading] = useState(true);
    const [areFormOptionsLoading, setAreFormOptionsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isGetProductLoading, makeRequest: makeGetProductRequest } = useFetch<IGetProductResponse>(true);
    const { isLoading: isEditProductLoading, makeRequest: makeEditProductRequest } = useFetch<IEditProductResponse>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id) {
                    const response = await makeGetProductRequest(() => {
                        return appService.product.getProduct({ id });
                    });
                    setProduct(response.product);
                }
            } catch (error) {
                modalError(content.error.notFound());
                setProduct(null);
                navigate("..", { relative: "route" });
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

    const handleSubmitForm = async (updatedProduct: FormData) => {
        try {
            if (!id) { return; }
            const response = await makeEditProductRequest(() => {
                return appService.product.editProduct({ id, product: updatedProduct });
            });
            setProduct(response.product);
            const value = getDisplayedValueFromItems([response.product], response.product.id);
            modalSuccess(content.operation.edit.success(Sections.Products, value));
            navigate("..", { relative: "route" });
        } catch (error) {
            modalError(content.operation.edit.error(Sections.Products, []));
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            {product &&
                (
                    <Section title="Edit product" name="section-products-edit">
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
