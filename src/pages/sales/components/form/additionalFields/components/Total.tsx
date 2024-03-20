import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { ISaleFormValues } from "../../../../../../schemas/sale.form.schema";

interface Props {
    defaultValue?: string;
    register: UseFormRegister<ISaleFormValues>;
}

export const Total: FC<Props> = ({ defaultValue, register }) => {
    return (
        <div className="summary total">
            <span className="summary__title total__text">Total: </span>
            <div className="summary__text">
                <input
                    type="text"
                    className="summary__text total__amount input input_disabled input_not-editable"
                    autoComplete="off"
                    id="total"
                    disabled={true}
                    defaultValue={defaultValue}
                    {...register("total")}
                />
                <span className="total__currency">€</span>
            </div>
        </div>
    );
};
