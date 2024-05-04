import { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { IProductFormValues } from "../../../../../schemas/product.form.schema";
import { InputText } from "../../../../../components/ui/Inputs/InputText";
import { InputNumber } from "../../../../../components/ui/Inputs/InputNumber";
import { SelectBrand } from "../formElements/SelectBrand";
import { SelectUnit } from "../formElements/SelectUnit";
import { SelectCategories } from "../formElements/SelectCategories";
import { IProduct } from "../../../../../models/entities/product.interface";
import { IProductsFormOptions } from "../../../../../models/entities/productsFormOptions.interface";

interface Props {
    register: UseFormRegister<IProductFormValues>;
    errors: FieldErrors<IProductFormValues>;
    control: Control<IProductFormValues>;
    product: IProduct | Omit<IProduct, "id"> | null;
    formOptions: IProductsFormOptions;
}

export const BasicFields: FC<Props> = ({ errors, register, control, product, formOptions: { brands, units, categories } }) => {
    return (
        <div className="fields-section fields-basic">
            <InputText
                name="name"
                label="Name"
                placeholder="Baseball bat"
                type="text"
                defaultValue={product?.name ?? ""}
                error={errors.name?.message}
                register={register}
            />
            <SelectCategories
                name="categories"
                label="Category"
                placeholder="Choose categories"
                control={control}
                error={errors.categories?.message}
                categories={categories}
                defaultValue={product?.categories?.map((item) => item.id) ?? []}
            />
            <InputNumber<IProductFormValues>
                name="price"
                label="Price"
                placeholder="9.99"
                control={control}
                defaultValue={product?.price ?? 0}
                error={errors.price?.message}
                formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                min="0"
            />
            <SelectUnit
                name="unit"
                label="Units"
                placeholder="Choose units"
                units={units}
                defaultValue={product?.unit ? { label: product.unit.name, value: product.unit.id } : undefined}
                control={control}
                error={errors.unit?.message}
            />
            <SelectBrand
                name="brand"
                label="Brand"
                placeholder="Choose brand"
                brands={brands}
                defaultValue={product?.brand ? { label: product.brand.name, value: product.brand.id } : undefined}
                control={control}
                error={errors.brand?.message}
            />
            <InputText
                name="sku"
                label="SKU"
                placeholder="SKU"
                type="text"
                defaultValue={product?.sku ?? ""}
                error={errors.sku?.message}
                register={register}
            />
            <InputNumber<IProductFormValues>
                name="quantity"
                label="Quantity"
                placeholder="9"
                control={control}
                defaultValue={product?.quantity ?? 0}
                error={errors.quantity?.message}
                min="0"
            />
        </div>
    );
};
