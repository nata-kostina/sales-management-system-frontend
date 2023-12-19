import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { InputNumber as AntInputNumber } from "antd";
import { IProductFormValues } from "../../../schemas/product.form.schema";

interface Props {
    control: Control<IProductFormValues>;
    error: string | undefined;
    label: string;
    placeholder: string;
    name: keyof IProductFormValues;
    min: string;
    defaultValue: number;
    formatter?: ((value: any, info: {
        userTyping: boolean;
        input: string;
    }) => string) | undefined;
}

export const InputNumber: FC<Props> = ({
    label,
    placeholder,
    error,
    control,
    name,
    min,
    formatter,
    defaultValue,
}) => {
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
                    render={({ field: { onChange, value, onBlur, ref } }) => (
                        <AntInputNumber
                            id={name}
                            placeholder={placeholder}
                            formatter={formatter}
                            min={min}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            // parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                            onChange={onChange}
                        // min="0"
                        />
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
};
