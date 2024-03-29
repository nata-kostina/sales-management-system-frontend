import { FC } from "react";
import { FieldErrors, Control } from "react-hook-form";
import { EditorField } from "../../../../../components/ui/Inputs/EditorField";
import { IProductFormValues } from "../../../../../schemas/product.form.schema";
import { DnDImages } from "../../../../../components/ui/Inputs/DnDImages";
import { IProduct } from "../../../../../models/entities/product.interface";

interface Props {
    errors: FieldErrors<IProductFormValues>;
    control: Control<IProductFormValues>;
    product: IProduct | Omit<IProduct, "id"> | null;
    changeIsFormLoading: (value: boolean) => void;
}

export const AdditionalFields: FC<Props> = ({ control, errors, product, changeIsFormLoading }) => {
    return (
        <div className="fields-section fields-additional">
            <EditorField
                label="Description"
                defaultValue={product?.description ?? ""}
                control={control}
                error={errors.description?.message}
                name="description"
                changeIsFormLoading={changeIsFormLoading}
            />
            <DnDImages
                label="Images"
                name="images"
                defaultValue={product?.images ?? []}
                control={control}
                error={errors.images?.message}
            />
        </div>
    );
};
