import { FC, useMemo } from "react";
import { Control } from "react-hook-form";
import { IBrand } from "../../../../../models/brand.interface";
import { IProductFormValues } from "../../../../../schemas/product.form.schema";
import { SingleSelect } from "../../../../../components/ui/Inputs/SingleSelect";

interface Props {
    control: Control<IProductFormValues>;
    error: string | undefined;
    name: keyof IProductFormValues;
    label: string;
    placeholder: string;
    brands: IBrand[];
    defaultValue?: string;
}

export const SelectBrand: FC<Props> = ({ brands, ...rest }) => {
    const options: { value: string; label: string; }[] = useMemo(() => {
        return brands.map((brand) => ({ value: brand.id, label: brand.name }));
    }, [brands]);

    return (
        <SingleSelect options={options} {...rest} />
    );
};
