import { SorterResult } from "antd/es/table/interface";
import { TableRowSelector } from "./TableRowSelector";

interface Props<T extends object> {
    data: T[];
    selectedRowKeys: React.Key[];
    onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
    children: React.ReactNode;
    handleOnChange: (sorter: SorterResult<T>) => void;
}

export function Table<T extends object>(props: Props<T>): JSX.Element {
    return (
        <TableRowSelector<T> {...props} />
    );
}
