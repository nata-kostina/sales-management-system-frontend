import { FC } from "react";
import { Control } from "react-hook-form";
import { ISaleFormValues } from "../../../../../../schemas/sale.form.schema";
import { InputNumber } from "../../../../../../components/ui/Inputs/InputNumber";
import { currencyFormatter } from "../../../../../../utils/helper";

interface Props {
    control: Control<ISaleFormValues>;
    error?: string;
    defaultValue?: number;
}

export const Paid: FC<Props> = ({ control, error, defaultValue }) => {
    return (
        <div className="summary paid">
            <InputNumber<ISaleFormValues>
                control={control}
                defaultValue={defaultValue}
                error={error}
                label="Paid"
                min="0"
                name="paid"
                placeholder="0"
                formatter={currencyFormatter}
            />
            {/* <span className="paid__currency">€</span> */}
        </div>
    );
};
