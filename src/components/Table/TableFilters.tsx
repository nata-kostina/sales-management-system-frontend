import { FC } from "react";
import { CrossSvg } from "../vectors/userActions/CrossSvg";
import { TableFilter } from "../../types/filters";

interface Props<F extends string> {
    filter: TableFilter<F>;
    handleFilterRemove: (key: string, value: string) => void;
}

export function TableFilters<T extends string>({ filter, handleFilterRemove }: Props<T>): JSX.Element {
    const filters = Object.keys(filter)
        .filter((filterKey) => filter[filterKey as keyof typeof filter])
        .reduce((acc, curr) => {
            const filterValue = filter[curr as keyof typeof filter];
            if (Array.isArray(filterValue)) {
                filterValue.forEach((el) => acc.push({ filterKey: curr as keyof typeof filter, value: el.value, label: el.label }));
            } else if (filterValue) {
                acc.push({
                    filterKey: curr as keyof typeof filter,
                    label: filterValue.label,
                    value: filterValue.value,
                });
            }
            return acc;
        }, [] as ({
            filterKey: keyof typeof filter;
            label: string;
            value: string;
        })[]);
    return (
        <ul className="filter-list">
            {filters.map((item) => {
                return (
                    <FilterItem
                        key={item.value}
                        handleFilterRemove={handleFilterRemove}
                        filterKey={item.filterKey}
                        label={item.label}
                        value={item.value}
                    />
                );
            })}
        </ul>
    );
}

interface FilterItemProps {
    filterKey: string;
    label: string;
    value: string;
    handleFilterRemove: (key: string, value: string) => void;
}

export const FilterItem: FC<FilterItemProps> = ({ label, filterKey, value, handleFilterRemove }) => {
    return (
        <li className="filter">
            <span className="filter__text">{label}</span>
            <button type="button" onClick={() => handleFilterRemove(filterKey, value)} className="btn btn-delete-filter">
                <CrossSvg />
            </button>
        </li>
    );
};
