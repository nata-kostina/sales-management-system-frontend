import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ICustomerFormValues } from "../../../schemas/customer.form.schema";

interface Props {
    control: Control<ICustomerFormValues>;
    error: string | undefined;
    label: string;
    defaultValue?: string;
}

export const PhoneSelect: FC<Props> = ({ control, error, label, defaultValue }) => {
    return (
        <div className="input-group input-group-phone">
            <label
                htmlFor="phone"
                className="label"
            >
                {label}
            </label>
            <div className="input-box">
                <Controller
                    control={control}
                    name="phone"
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput value={value} onChange={onChange} className="input" international={true} withCountryCallingCode={true} />
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
};
