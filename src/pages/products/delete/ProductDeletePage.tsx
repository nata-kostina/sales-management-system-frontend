import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Section } from "../components/Section";
import { ProductForm } from "../components/FormProduct/ProductForm";
import { useFetch } from "../../../hooks/useFetch";
import { IGetProductResponse } from "../../../models/response/IGetProductResponse";
import { appService } from "../../../services";
import { IProduct } from "../../../models/product.interface";
import { Loader } from "../../../components/ui/Loader";
import { IEditProductPayload } from "../../../models/request/IEditProductPayload";
import { IEditProductResponse } from "../../../models/response/IEditProductResponse";
import { IProductDto } from "../../../dtos/product/product.dto.interface";
import { IDeleteProduct } from "../../../models/response/IDeleteProductResponse";
import { Preloader } from "../../../components/ui/Preloader/Preloader";

export const ProductDeletePage: FC = () => {
    const { id } = useParams();

    const { makeRequest: makeDeleteRequest, isLoading: isDeleteProductLoading } = useFetch<IDeleteProduct>();

    const handleSubmitForm = async () => {
        try {
            if (id) {
                await makeDeleteRequest(() => {
                    return appService.products.deleteProduct(id);
                });
            }
        } catch (error) {

        }
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(isDeleteProductLoading);
    }, [isDeleteProductLoading]);

    return (
        <>
            {isLoading && <Preloader />}

            <Section title="Edit product" name="section-products-edit" cl="form-layout-1">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__body">
    
                        </div>
                        <div className="card__footer" />
                    </div>
                </div>
            </Section>

        </>
    );
};
