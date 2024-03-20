import { Path, PathValue, Control, Controller } from "react-hook-form";
import { InputNumber as AntInputNumber } from "antd";

interface Props<T extends object> {
    control: Control<T>;
    error: string | undefined;
    label: string;
    placeholder: string;
    name: Path<T>;
    min: string;
    defaultValue: PathValue<T, Path<T>> | undefined;
    formatter?: ((value: any, info: {
        userTyping: boolean;
        input: string;
    }) => string) | undefined;
    parser?: ((displayValue: string | undefined) => string);
}

export function InputNumber<T extends object>({
    label,
    placeholder,
    error,
    control,
    name,
    min,
    formatter,
    defaultValue,
    parser,
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
                            onChange={onChange}
                            parser={parser}
                        />
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
}
