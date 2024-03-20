import { Table } from "antd";
import { GetRowKey, SorterResult, TableRowSelection } from "antd/es/table/interface";

interface Props<T extends object> {
    data: T[];
    rowKey?: string | GetRowKey<T>;
    children: React.ReactNode;
    selectedRowKeys?: React.Key[];
    onSelectChange?: (newSelectedRowKeys: React.Key[]) => void;
    handleOnChange?: (sorter: SorterResult<T>) => void;
}

export function TableRowSelector<T extends object>({ rowKey, data, children, onSelectChange, selectedRowKeys, handleOnChange }: Props<T>): JSX.Element {
    const rowSelection: TableRowSelection<T> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_NONE,
        ],
    };

    return (
        <Table<T>
            onChange={(p, f, s) => { if (handleOnChange) { handleOnChange(s as SorterResult<T>); } }}
            id="app-table"
            rowKey={rowKey ?? "id"}
            rowSelection={rowSelection}
            dataSource={data}
            pagination={false}
            className="app-table"
            scroll={{ x: true }}
        >
            {children}
        </Table>
    );
}
