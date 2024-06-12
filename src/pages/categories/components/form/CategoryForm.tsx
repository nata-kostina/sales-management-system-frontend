import { FC } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ICategory } from "../../../../models/entities/category.interface";
import { ICategoryFormValues, categoryFormSchema } from "../../../../schemas/category.form.schema";
import { CategoryDto } from "../../../../dtos/category.dto";
import { BasicFields } from "./BasicFields";

interface Props {
    name: string;
    submitBtn: string;
    category: ICategory | Omit<ICategory, "id"> | null;
    changeIsFormLoading: (value: boolean) => void;
    handleSubmitForm: (data: FormData) => Promise<void>;
}

export const CategoryForm: FC<Props> = ({
    name, submitBtn, category,
    changeIsFormLoading,
    handleSubmitForm,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<ICategoryFormValues>({
        resolver: yupResolver(categoryFormSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const categoryDto = new CategoryDto(data);
        handleSubmitForm(categoryDto.formData);
    });
    return (
        <form className={`form form-items form-category form-category-${name}`} onSubmit={onSubmit}>
            <div className="form__inner">
                <div className="form__body">
                    <BasicFields
                        register={register}
                        errors={errors}
                        control={control}
                        category={category}
                        changeIsFormLoading={changeIsFormLoading}
                        setValue={setValue}
                    />
                </div>
                <div className="form__footer">
                    <div className="user-actions">
                        <Link to=".." relative="route" className="btn btn-action btn-reset">Cancel</Link>
                        <button type="submit" className="btn btn-action btn-apply">{submitBtn}</button>
                    </div>
                </div>
            </div>
        </form>
    );
};
