import { FC, useMemo } from "react";
import { Control } from "react-hook-form";
import { IProductFormValues } from "../../../../../schemas/product.form.schema";
import { SingleSelect } from "../../../../../components/ui/Inputs/SingleSelect";
import { IUnit } from "../../../../../models/entities/unit.interface";

interface Props {
    control: Control<IProductFormValues>;
    error: string | undefined;
    name: keyof IProductFormValues;
    label: string;
    placeholder: string;
    units: IUnit[];
    defaultValue?: string;
}

export const SelectUnit: FC<Props> = ({ units, ...rest }) => {
    const options: { value: string; label: string; }[] = useMemo(() => {
        return units.map((unit) => ({ value: unit.id, label: unit.name }));
    }, [units]);
    return (
        <SingleSelect options={options} {...rest} />
    );
};
