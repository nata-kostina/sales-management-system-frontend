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
    defaultValue: string[];
    options: ISelectOption[];
}

export const MultiSelect: FC<Props> = ({ control, error, name, label, placeholder, defaultValue, options }) => {
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
                            id={name}
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder={placeholder}
                            onChange={(value) => {
                                console.log(value);
                                onChange(value);
                            }}
                            value={value}
                            options={options}
                        />
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>

    );
};
