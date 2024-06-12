import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { ISaleFormValues } from "../../../../../../schemas/sale.form.schema";

interface Props {
    defaultValue?: number;
    control: Control<ISaleFormValues>;
}
export const Total: FC<Props> = ({ defaultValue, control }) => {
    return (
        <div className="summary total">
            <span className="label">Total: </span>
            <div className="summary-input-group">
                <Controller
                    control={control}
                    name="total"
                    defaultValue={defaultValue}
                    render={({ field: { value } }) => (
                        <input
                            type="text"
                            className="total__amount input input_disabled input_not-editable"
                            autoComplete="off"
                            id="total"
                            disabled={true}
                            value={value}
                        />
                    )}
                />
                <span className="total__currency">€</span>
            </div>
        </div>
    );
};
