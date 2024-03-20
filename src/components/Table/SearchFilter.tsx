import Search from "antd/es/input/Search";
import { FC } from "react";
import { TableFilterValue } from "../../types/filters";

interface Props {
    onSearch: (value: TableFilterValue | null) => void;
    placeholder: string;
    localFilter?: TableFilterValue | null;
    changeLocalFilter: (value: TableFilterValue | null) => void;
}

export const SearchFilter: FC<Props> = ({ onSearch, placeholder, changeLocalFilter, localFilter }) => {
    return (
        <div className="filter filter-search">
            <div className="filter__inner">
                <Search
                    value={localFilter?.value ?? ""}
                    onChange={(e) => changeLocalFilter({ label: e.target.value, value: e.target.value })}
                    onSearch={(input) => onSearch({ label: input, value: input })}
                    placeholder={placeholder}
                />
                <div className="user-actions">
                    <button className="btn btn-action btn-apply" onClick={() => { if (localFilter) { onSearch(localFilter); } }}>Filter</button>
                    <button className="btn btn-action btn-reset" onClick={() => { changeLocalFilter(null); onSearch(null); }}>Reset</button>
                </div>
            </div>
        </div>
    );
};
