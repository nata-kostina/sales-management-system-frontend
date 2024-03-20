import { FC, useMemo } from "react";
import { Control } from "react-hook-form";
import { SingleSelect } from "../../../../../../components/ui/Inputs/SingleSelect";
import { IPayment } from "../../../../../../models/entities/payment.interface";
import { ISaleFormValues } from "../../../../../../schemas/sale.form.schema";
import { ISelectOption } from "../../../../../../types/ui.types";

interface Props {
    control: Control<ISaleFormValues>;
    error?: string;
    name: keyof ISaleFormValues;
    label: string;
    placeholder: string;
    payment: IPayment[];
    defaultValue?: ISelectOption<ISaleFormValues>;
}

export const SelectPayment: FC<Props> = ({ payment, ...rest }) => {
    const options: { value: string; label: string; }[] = useMemo(() => {
        return payment.map((p) => ({ value: p.id, label: p.name }));
    }, [payment]);
    return (
        <SingleSelect<ISaleFormValues> options={options} {...rest} />
    );
};
