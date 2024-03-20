/* eslint-disable react/no-unstable-nested-components */
import { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { debounce } from "../../../utils/helper";
import { ISelectOption } from "../../../types/ui.types";

interface Props<T extends FieldValues = any> {
    fetchOptions: (search: string) => Promise<ISelectOption<T>[]>;
    control?: Control<T>;
    error?: string;
    name: Path<T>;
    label: string;
    placeholder: string;
    defaultValue?: ISelectOption<T>;
    debounceTimeout: number;
    handleOnChange?: (value: string) => Promise<void>;
}

export function AsyncSelect<T extends FieldValues = any>({ control, error, name, label, placeholder, defaultValue, fetchOptions, debounceTimeout, handleOnChange }: Props<T>): JSX.Element {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<ISelectOption<T>[]>(() => defaultValue ? [defaultValue] : []);
    const fetchRef = useRef(0);

    const [localValue, setLocalValue] = useState<ISelectOption<T> | null>(defaultValue ?? null);

    const debounceFetcher = useMemo(() => {
        const loadOptions = async (value: string) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <div className={`input-group input-group-${name}`}>
            <label
                htmlFor={name}
                className="label"
            >
                {label}
            </label>
            <div className="input-box">
                {
                    control ? (
                        <Controller
                            control={control}
                            name={name}
                            defaultValue={defaultValue?.value}
                            render={({ field: { onChange: onSelectChange } }) => {
                                return (
                                    <ControlledSelect
                                        debounceFetcher={debounceFetcher}
                                        fetching={fetching}
                                        localValue={localValue}
                                        options={options}
                                        placeholder={placeholder}
                                        setLocalValue={setLocalValue}
                                        handleOnChange={handleOnChange}
                                        onSelectChange={onSelectChange}
                                    />
                                );
                            }}
                        />
                    ) : (
                        <ControlledSelect
                            debounceFetcher={debounceFetcher}
                            fetching={fetching}
                            localValue={localValue}
                            options={options}
                            placeholder={placeholder}
                            setLocalValue={setLocalValue}
                            handleOnChange={handleOnChange}
                        />
                    )}

                {error && <p className="input-error">{error}</p>}
            </div>
        </div>
    );
}

interface ControlledSelectProps<T> {
    debounceFetcher: (value: string) => Promise<void>;
    fetching: boolean;
    options: ISelectOption<T>[];
    localValue: ISelectOption<T> | null;
    placeholder: string;
    setLocalValue: React.Dispatch<React.SetStateAction<ISelectOption<T> | null>>;
    onSelectChange?: (...event: any[]) => void;
    handleOnChange?: ((value: string) => Promise<void>);
}

export function ControlledSelect<T extends FieldValues = any>({
    debounceFetcher,
    fetching, localValue, options, placeholder, setLocalValue, handleOnChange, onSelectChange,
}: ControlledSelectProps<T>): JSX.Element {
    return (
        <Select
            labelInValue={true}
            filterOption={false}
            onSearch={debounceFetcher}
            showSearch={true}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            options={options}
            placeholder={placeholder}
            value={localValue}
            // defaultValue={defaultValue}
            // autoClearSearchValue={false}
            // allowClear={false}
            onSelect={(newValue) => {
                setLocalValue(newValue);
                if (onSelectChange) {
                    onSelectChange(newValue.value);
                }
                if (handleOnChange) {
                    handleOnChange(newValue.value);
                }
            }}
        />
    );
}
