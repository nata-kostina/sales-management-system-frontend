import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { ProductForm } from "../components/form/ProductForm";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { IProduct } from "../../../models/entities/product.interface";
import { IAddProductResponse } from "../../../models/responses/products.response";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { Sections } from "../../../types/entities";

export const ProductAddPage: FC = () => {
    const [product, setProduct] = useState<Omit<IProduct, "id"> | null>(null);

    const [areFormFieldsLoading, setAreFormFieldsLoading] = useState(true);
    const [areFormOptionsLoading, setAreFormOptionsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isAddProductLoading, makeRequest: makeAddProductRequest } = useFetch<IAddProductResponse>();

    const { modalSuccess, modalError } = useModalOperationResult();

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(isAddProductLoading || areFormOptionsLoading || areFormFieldsLoading);
    }, [isAddProductLoading, areFormOptionsLoading, areFormFieldsLoading]);

    const changeIsFormLoading = (value: boolean) => {
        setAreFormFieldsLoading(value);
    };

    const changeAreFormOptionsLoading = (value: boolean) => {
        setAreFormOptionsLoading(value);
    };

    const handleSubmitForm = async (newProduct: FormData) => {
        try {
            const response = await makeAddProductRequest(() => {
                return appService.product.addProduct(newProduct);
            });
            setProduct(response.product);
            modalSuccess(content.operation.create.success(Sections.Products, [response.product.name]));
            navigate("..", { relative: "route" });
        } catch (error) {
            modalError(content.operation.create.error(Sections.Products, []));
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Section title="Add product" name="section-products-add">
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
