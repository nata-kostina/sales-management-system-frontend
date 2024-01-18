import { FC, useMemo } from "react";
import { Control } from "react-hook-form";
import { MultiSelect } from "../../../../../components/ui/Inputs/MultiSelect";
import { ISelectOption } from "../../../../../types/ui.types";
import { IProductFormValues } from "../../../../../schemas/product.form.schema";
import { ICategory } from "../../../../../models/entities/category.interface";

interface Props {
    control: Control<IProductFormValues>;
    error: string | undefined;
    name: keyof IProductFormValues;
    label: string;
    placeholder: string;
    defaultValue: string[];
    categories: ICategory[];
}

export const SelectCategories: FC<Props> = ({ categories, ...rest }) => {
    const options: ISelectOption[] = useMemo(() => {
        return categories.map((category) => ({ value: category.id, label: category.name }));
    }, [categories]);
    return (
        <MultiSelect options={options} {...rest} />
    );
};
