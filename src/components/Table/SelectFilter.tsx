import { FC, useState } from "react";
import { Select, Spin } from "antd";

interface Props {
    options: { label: string; value: string; }[];
    isLoading: boolean;
    onSelect: (value: string) => void;
}

export const SelectFilter: FC<Props> = ({ options, isLoading, onSelect }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    return (
        <div className="filter">
            <div className="filter__inner">
                {isLoading ? <Spin /> : (
                    <>
                        <Select
                            className="filter-select"
                            mode="multiple"
                            placeholder="Please select"
                            onChange={(value) => setSelectedOptions(value)}
                            options={options}
                            optionFilterProp="label"
                        />
                        <div className="user-actions">
                            <button className="btn btn-action btn-apply" onClick={() => onSelect(selectedOptions.join(","))}>Filter</button>
                            <button
                                className="btn btn-action btn-reset"
                                onClick={() => {
                                    setSelectedOptions([]);
                                    onSelect("");
                                }}
                            >Reset
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
