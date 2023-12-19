import { FC } from "react";
import { Select } from "antd";
import { Control, Controller } from "react-hook-form";
import { IProductFormValues } from "../../../schemas/product.form.schema";
import { ISelectOption } from "../../../types/ui.types";

interface Props {
    control: Control<IProductFormValues>;
    error: string | undefined;
    name: keyof IProductFormValues;
    label: string;
    placeholder: string;
    options: ISelectOption[];
    defaultValue?: string;
}

export const SingleSelect: FC<Props> = ({ control, error, name, label, placeholder, options, defaultValue }) => {
    return (
        <div className={`input-group input-group-${name}`}>
            <label
                htmlFor={name}
                className="label"
            >
                {label}
            </label>
            <div className="input-box">
                <Controller
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            placeholder={placeholder}
                            style={{ width: "100%" }}
                            onChange={onChange}
                            options={options}
                            value={value}
                        />
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
};
