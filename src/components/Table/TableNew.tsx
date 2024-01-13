import { SorterResult } from "antd/es/table/interface";
import { TableRowSelector } from "./TableRowSelector";
import { IProduct } from "../../models/product.interface";

interface Props<T extends object> {
    data: T[];
    selectedRowKeys: React.Key[];
    onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
    children: React.ReactNode;
    handleOnChange: (
        sorter: SorterResult<IProduct>,
    ) => void;
}

export function TableNew<T extends object>(props: Props<T>): JSX.Element {
    return (
        <TableRowSelector<T> {...props} />
    );
}
