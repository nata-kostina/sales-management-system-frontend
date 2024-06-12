import { Select } from "antd";
import { Control, Controller, FieldValues } from "react-hook-form";
import { IProductFormValues } from "../../../schemas/product.form.schema";
import { ISelectOption } from "../../../types/ui.types";

interface Props<T> {
    control: Control<IProductFormValues>;
    error: string | undefined;
    name: keyof IProductFormValues;
    label: string;
    placeholder: string;
    defaultValue: string[];
    options: ISelectOption<T>[];
}

export function MultiSelect<T extends FieldValues = any>({ control, error, name, label, placeholder, defaultValue, options }: Props<T>): JSX.Element {
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
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                            options={options}
                        />
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>

    );
}
