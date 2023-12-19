import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { IProductFormValues } from "../../../schemas/product.form.schema";

interface Props {
    defaultValue: string;
    label: string;
    type: string;
    placeholder?: string;
    name: keyof IProductFormValues;
    register: UseFormRegister<IProductFormValues>;
    error: string | undefined;
}

export const InputText: FC<Props> = ({
    defaultValue,
    name,
    label,
    type,
    placeholder,
    register,
    error,
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
                <input
                    defaultValue={defaultValue}
                    type={type}
                    className="input"
                    placeholder={placeholder}
                    autoComplete="off"
                    id={name}
                    {...register(name)}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
};
