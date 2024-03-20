import { FC, useState } from "react";
import { Select, Spin } from "antd";
import { TableFilterValue } from "../../types/filters";

interface Props {
    options: { label: string; value: string; }[];
    isLoading: boolean;
    onSelect: (value: TableFilterValue[] | null) => void;
    localFilter?: TableFilterValue[] | null;
    changeLocalFilter: (value: TableFilterValue[] | null) => void;
}

export const SelectFilter: FC<Props> = ({ options, isLoading, onSelect, changeLocalFilter, localFilter }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="filter">
            <div className="filter__inner">
                {isLoading ? <Spin /> : (
                    <>
                        <Select
                            open={open}
                            className="filter-select"
                            mode="multiple"
                            placeholder="Please select"
                            value={localFilter ? Object.values(localFilter).map((v) => v?.value) : []}
                            onDropdownVisibleChange={(visible) => setOpen(visible)}
                            onChange={(_value, option) => {
                                let result: TableFilterValue[] | null = null;
                                if (Array.isArray(option) && option.length > 0) {
                                    result = option;
                                }
                                changeLocalFilter(result);
                                setOpen(false);
                            }}
                            options={options}
                            optionFilterProp="label"
                        />
                        <div className="user-actions">
                            <button
                                type="button"
                                className="btn btn-action btn-apply"
                                onClick={() => onSelect(localFilter ?? null)}
                            >Filter
                            </button>
                            <button
                                type="button"
                                className="btn btn-action btn-reset"
                                onClick={() => {
                                    changeLocalFilter(null);
                                    onSelect(null);
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
