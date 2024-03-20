import { DatePicker as AntDatePicker } from "antd";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface Props<T extends FieldValues = any> {
    control: Control<T>;
    error?: string;
    name: Path<T>;
    label: string;
    defaultValue?: PathValue<T, Path<T>>;
}

export function DatePicker<T extends FieldValues = any>({ control, error, name, label, defaultValue }: Props<T>): JSX.Element {
    const [localValue, setLocalValue] = useState<Dayjs | undefined>(() => defaultValue ? dayjs(defaultValue) : undefined);
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
                    defaultValue={defaultValue}
                    render={({ field: { onChange: onPickerChange } }) => (
                        <AntDatePicker
                            value={localValue}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setLocalValue(newValue);
                                    onPickerChange(newValue.valueOf());
                                }
                            }}
                        />
                    )}
                />
                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
}
