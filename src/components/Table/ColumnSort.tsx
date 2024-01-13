import { FC } from "react";
import { SortSvg } from "../vectors/userActions/SortSvg";

interface Props {
    title: string;
    onAscSort: () => Promise<void>;
    onDescSort: () => Promise<void>;
}

export const ColumnSort: FC<Props> = ({ title, onAscSort, onDescSort }) => {
    return (
        <div className="col-sort">
            <span className="col__text">{title}</span>
            <div className="user-actions">
                <button className="btn btn-sort btn-sort-asc" onClick={onAscSort}>
                    <SortSvg cl="icon-sort-asc" />
                </button>
                <button className="btn btn-sort btn-sort-desc" onClick={onDescSort}>
                    <SortSvg cl="icon-sort-desc" />
                </button>
            </div>
        </div>
    );
};
