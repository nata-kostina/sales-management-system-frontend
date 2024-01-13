import { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { ICategoryFormValues } from "../../../../schemas/category.form.schema";
import { ICategory } from "../../../../models/entities/category.interface";
import { InputText } from "../../../../components/ui/Inputs/InputText";
import { DnDImages } from "../../../../components/ui/Inputs/DnDImages";
import { EditorField } from "../../../../components/ui/Inputs/EditorField";

interface Props {
    register: UseFormRegister<ICategoryFormValues>;
    errors: FieldErrors<ICategoryFormValues>;
    control: Control<ICategoryFormValues>;
    category: ICategory | Omit<ICategory, "id"> | null;
    changeIsFormLoading: (value: boolean) => void;
}

export const BasicFields: FC<Props> = ({ errors, register, control, category, changeIsFormLoading }) => {
    return (
        <div className="fields-section fields-basic">
            <InputText
                name="name"
                label="Name"
                placeholder="Baseball bat"
                type="text"
                defaultValue={category?.name ?? ""}
                error={errors.name?.message}
                register={register}
            />
            <InputText
                name="shortDescription"
                label="Short description"
                placeholder=""
                type="text"
                defaultValue={category?.shortDescription ?? ""}
                error={errors.shortDescription?.message}
                register={register}
            />
            <EditorField
                label="Long description"
                defaultValue={category?.longDescription ?? ""}
                control={control}
                error={errors.longDescription?.message}
                name="longDescription"
                changeIsFormLoading={changeIsFormLoading}
            />
            <DnDImages
                label="Images"
                name="images"
                defaultValue={category?.images ?? []}
                control={control}
                error={errors.images?.message}
            />
        </div>
    );
};
