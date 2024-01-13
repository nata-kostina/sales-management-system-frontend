import Search from "antd/es/input/Search";
import { FC, useState } from "react";

interface Props {
    onSearch: (value: string) => void;
    placeholder: string;
}

export const SearchFilter: FC<Props> = ({ onSearch, placeholder }) => {
    const [input, setInput] = useState("");
    return (
        <div className="filter filter-search">
            <div className="filter__inner">
                <Search value={input} onChange={(e) => setInput(e.target.value)} onSearch={onSearch} placeholder={placeholder} />
                <div className="user-actions">
                    <button className="btn btn-action btn-apply" onClick={() => onSearch(input)}>Filter</button>
                    <button className="btn btn-action btn-reset" onClick={() => { setInput(""); onSearch(""); }}>Reset</button>
                </div>
            </div>
        </div>
    );
};
