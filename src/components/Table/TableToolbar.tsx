/* eslint-disable react/no-unstable-nested-components */
import { App } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { TableFilter, TableFilterValue } from "../../types/filters";
import { ButtonAdd } from "../ui/Buttons/ButtonAdd/ButtonAdd";
import { ButtonExcel } from "../ui/Buttons/ButtonExcel/ButtonExcel";
import { ButtonToolDelete } from "../ui/Buttons/ButtonToolDelete/ButtonToolDelete";
import { TableFilters } from "./TableFilters";

interface Props<F extends string> {
    filter: TableFilter<F>;
    changeFilter: (value: TableFilter<F>) => void;
    selectedNum: number;
}

export function TableToolbar<F extends string>({ filter, changeFilter, selectedNum }: Props<F>): JSX.Element {
    const { modal } = App.useApp();

    const handleDeleteAll = () => {
    };
    const handleDeleteSelected = () => {
    };

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

    const handleDelete = () => {
        const instance = modal.confirm({
            title: "Are you sure you want to delete items?",
            icon: <ExclamationCircleFilled />,
            footer: () => (
                <>
                    <button
                        type="button"
                        className="btn btn-modal btn-info"
                        onClick={() => {
                            handleDeleteAll();
                            instance.destroy();
                        }}
                    >
                        <span className="btn__text">
                            Delete all
                        </span>
                    </button>
                    {selectedNum !== 0 && (
                        <button
                            type="button"
                            className="btn btn-modal btn-info"
                            onClick={() => {
                                handleDeleteSelected();
                                instance.destroy();
                            }}
                        >
                            <span className="btn__text">
                                Delete selected {`(${selectedNum})`}
                            </span>
                        </button>
                    )}
                    <button
                        type="button"
                        className="btn btn-modal btn-default"
                        onClick={() => instance.destroy()}
                    >
                        <span className="btn__text">
                            Cancel
                        </span>
                    </button>
                </>
            ),
        });
    };
    return (
        <div className="table-toolbar">
            <TableFilters<F> filter={filter} handleFilterRemove={handleFilterRemove} />

            {/* <div className="table-info">
            {selectedRowKeys.length !== 0 && (
                <span>
                    Selected: {selectedRowKeys.length} {selectedRowKeys.length === 1 ? "item" : "items"}
                </span>
            )}
        </div> */}
            <div className="table-actions">
                <ButtonExcel onClick={() => console.log("12")} />
                <ButtonToolDelete onClick={handleDelete} />
                <ButtonAdd href="./add" text="Add sale" />
            </div>
        </div>
    );
}
