import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "../../../components/Section/Section";
import { ProductForm } from "../components/form/ProductForm";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { IAddProductResponse } from "../../../models/response/IAddProductResponse";
import { IProduct } from "../../../models/product.interface";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { Routes } from "../../../types/routes";
import { MessageService } from "../../../services/message.service";

export const ProductAddPage: FC = () => {
    const [product, setProduct] = useState<Omit<IProduct, "id"> | null>(null);

    const [areFormFieldsLoading, setAreFormFieldsLoading] = useState(true);
    const [areFormOptionsLoading, setAreFormOptionsLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { isLoading: isAddProductLoading, makeRequest: makeAddProductRequest } = useFetch<IAddProductResponse>();

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
                return appService.products.addProduct(newProduct);
            });
            setProduct(response.product);
            const name = newProduct.get("name") as string | null;
            MessageService.success(`The product ${name && `"${name}" `}was successfully added`);
            navigate(`../${Routes.Products}`, { relative: "route" });
        } catch (error) {
            MessageService.error("The product was not added");
        }
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Link to={`../${Routes.Products}`} relative="route">Link</Link>
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
