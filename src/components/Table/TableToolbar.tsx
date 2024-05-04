import { TableFilter, TableFilterValue } from "../../types/filters";
import { ButtonAdd } from "../ui/Buttons/ButtonAdd/ButtonAdd";
import { ButtonCsv } from "../ui/Buttons/ButtonCsv/ButtonCsv";
import { ButtonToolDelete } from "../ui/Buttons/ButtonToolDelete/ButtonToolDelete";
import { TableFilters } from "./TableFilters";

interface Props<F extends string> {
    filter: TableFilter<F>;
    changeFilter: (value: TableFilter<F>) => void;
    selectedItems: string[];
    handleDelete: () => void;
    handleCsv: () => void;
    addBtnText: string;
}

export function TableToolbar<F extends string>({
    filter, changeFilter, selectedItems, addBtnText, handleDelete, handleCsv,
}: Props<F>): JSX.Element {
    const handleFilterRemove = (key: string, value: string) => {
        let filterItem = filter[key as keyof typeof filter];
        if (filterItem) {
            const updatedFilter = { ...filter };
            if (Array.isArray(filterItem)) {
                filterItem = filterItem.filter((item) => item.value !== value);
                updatedFilter[key as keyof typeof filter] = (filterItem as TableFilterValue[]).length === 0 ? null : filterItem;
            } else {
                delete updatedFilter[key as keyof typeof filter];
            }
            changeFilter(updatedFilter);
        }
    };

    return (
        <div className="table-toolbar">
            <div className="toolbar-group">
                <div className="table-info">
                    <span>
                        Selected: {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"}
                    </span>
                </div>
                <TableFilters<F> filter={filter} handleFilterRemove={handleFilterRemove} />
            </div>
            <div className="toolbar-group">
                <div className="table-actions">
                    <ButtonCsv onClick={handleCsv} />
                    <ButtonToolDelete onClick={handleDelete} />
                    <ButtonAdd to="add" text={addBtnText} />
                </div>
            </div>
        </div>
    );
}
