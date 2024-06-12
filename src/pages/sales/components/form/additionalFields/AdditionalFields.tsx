import { FC, useState } from "react";
import { FieldErrors, UseFormSetValue, Control, UseFormClearErrors } from "react-hook-form";
import { ISaleFormValues } from "../../../../../schemas/sale.form.schema";
import { ISale } from "../../../../../models/entities/sale.interface";
import { SaleProductsTable } from "./components/SaleProductsTable";
import { SelectProduct } from "./components/SelectProduct";
import { useFetch } from "../../../../../hooks/shared/useFetch";
import { IGetProductResponse } from "../../../../../models/responses/products.response";
import { appService } from "../../../../../services";
import { ISaleProduct } from "../../../../../models/entities/saleProduct.interface";
import { Total } from "./components/Total";
import { Paid } from "./components/Paid";
import { getTotal } from "../../../../../utils/helper";

interface Props {
    errors: FieldErrors<ISaleFormValues>;
    sale: ISale | Omit<ISale, "id"> | null;
    setValue: UseFormSetValue<ISaleFormValues>;
    control: Control<ISaleFormValues>;
    clearErrors: UseFormClearErrors<ISaleFormValues>;
}

export const AdditionalFields: FC<Props> = ({ errors, sale, setValue, control, clearErrors }) => {
    const [products, setProducts] = useState(() => sale?.products ?? []);
    const { makeRequest } = useFetch<IGetProductResponse>();

    const handleOnChange = async (value: string) => {
        const existingProduct = products.find((p) => p.id === value);
        if (existingProduct) { return; }
        const { product } = await makeRequest(() => appService.product.getProduct({ id: value }));
        const newProduct: ISaleProduct = {
            id: value,
            name: product.name,
            image: product.images.length > 0 ? product.images[0] : null,
            price: product.price,
            quantity: 1,
            total: product.price,
        };
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        setValue("products", updatedProducts);
        const total = getTotal(updatedProducts);
        setValue("total", total);
        if (updatedProducts.length > 0) {
            clearErrors("products");
        }
    };

    const updateQuantity = (id: string, value: number): void => {
        const product = products.find((p) => p.id === id);
        if (product) {
            product.quantity = value;
            product.total = value * product.price;
        }
        const total = getTotal(products);
        setValue("total", total);
        setProducts([...products]);
        setValue("products", products);
    };
    const handleDeleteProduct = (id: string): void => {
        const updatedProducts = products.filter((p) => p.id !== id);
        setProducts([...updatedProducts]);
        setValue("products", updatedProducts);
        const total = getTotal(updatedProducts);
        setValue("total", total);
    };

    return (
        <div className="fields-section fields-additional">
            <SelectProduct
                label="Add Product"
                name="product"
                placeholder="Select Product"
                handleOnChange={handleOnChange}
                error={errors.products?.message}
            />
            <SaleProductsTable
                products={products}
                updateQuantity={updateQuantity}
                handleDeleteProduct={handleDeleteProduct}
            />
            <div className="separator" />
            <Total control={control} defaultValue={sale?.total} />
            <div className="separator" />
            <Paid control={control} error={errors.paid?.message} defaultValue={sale ? +(sale.paid) : undefined} />
        </div>
    );
};
