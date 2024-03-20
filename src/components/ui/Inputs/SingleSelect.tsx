import { Select } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ISelectOption } from "../../../types/ui.types";

interface Props<T extends FieldValues = any> {
    control: Control<T>;
    error?: string;
    name: Path<T>;
    label: string;
    placeholder: string;
    options: ISelectOption<T>[];
    defaultValue?: ISelectOption<T>;
}

export function SingleSelect<T extends FieldValues = any>({ control, error, name, label, placeholder, options, defaultValue }: Props<T>): JSX.Element {
    return (
        <div className={`input-group input-group-${name.toString()}`}>
            <label
                htmlFor={name.toString()}
                className="label"
            >
                {label}
            </label>
            <div className="input-box">
                <Controller
                    control={control}
                    name={name}
                    defaultValue={defaultValue?.value}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <Select
                                placeholder={placeholder}
                                style={{ width: "100%" }}
                                onChange={onChange}
                                options={options}
                                value={value}
                            />
                        );
                    }}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
}
