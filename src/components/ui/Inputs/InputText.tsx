import { Path, UseFormRegister } from "react-hook-form";

interface Props<T extends object> {
    defaultValue: string;
    label: string;
    type: string;
    placeholder?: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error: string | undefined;
}

export function InputText<T extends object>({
    defaultValue,
    name,
    label,
    type,
    placeholder,
    register,
    error,
}: Props<T>): JSX.Element {
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
}
