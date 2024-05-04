import { FC, useMemo } from "react";
import { Control } from "react-hook-form";
import { IBrand } from "../../../../../models/entities/brand.interface";
import { IProductFormValues } from "../../../../../schemas/product.form.schema";
import { SingleSelect } from "../../../../../components/ui/Inputs/SingleSelect";
import { ISelectOption } from "../../../../../types/ui.types";

interface Props {
    control: Control<IProductFormValues>;
    error: string | undefined;
    name: keyof IProductFormValues;
    label: string;
    placeholder: string;
    brands: IBrand[];
    defaultValue?: ISelectOption<IProductFormValues>;
}

export const SelectBrand: FC<Props> = ({ brands, ...rest }) => {
    const options: ISelectOption<IProductFormValues>[] = useMemo(() => {
        return brands.map((brand) => ({ value: brand.id, label: brand.name, key: brand.id }));
    }, [brands]);

    return (
        <SingleSelect<IProductFormValues> options={options} {...rest} />
    );
};
