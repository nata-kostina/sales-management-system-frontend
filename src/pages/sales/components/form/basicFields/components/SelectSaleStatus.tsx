import { FC, useMemo } from "react";
import { Control } from "react-hook-form";
import { ISelectOption } from "../../../../../../types/ui.types";
import { ISaleStatus } from "../../../../../../models/entities/saleStatus.interface";
import { SingleSelect } from "../../../../../../components/ui/Inputs/SingleSelect";
import { ISaleFormValues } from "../../../../../../schemas/sale.form.schema";

interface Props {
    control: Control<ISaleFormValues>;
    error: string | undefined;
    name: keyof ISaleFormValues;
    label: string;
    placeholder: string;
    defaultValue?: ISelectOption<ISaleFormValues>;
    statuses: ISaleStatus[];
}

export const SelectSaleStatus: FC<Props> = ({ statuses, ...rest }) => {
    const options: ISelectOption<ISaleFormValues>[] = useMemo(() => {
        return statuses.map((status) => ({ value: status.id, label: status.name, key: status.id }));
    }, [statuses]);
    return (
        <SingleSelect<ISaleFormValues> options={options} {...rest} />
    );
};
