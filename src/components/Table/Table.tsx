import { useReactTable, getCoreRowModel, flexRender, ColumnDef, SortingState } from "@tanstack/react-table";
import { HTMLProps, useRef, useEffect, useState } from "react";

interface Props<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
}

const baseColumns: ColumnDef<any, any>[] = [{
    id: "select",
    header: ({ table }) => (
        <IndeterminateCheckbox
            {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
            }}
        />
    ),
    cell: ({ row }) => (
        <div className="px-1">
            <IndeterminateCheckbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        </div>
    ),
}];

export function Table<T>({ columns, data }: Props<T>): JSX.Element {
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns: [...baseColumns, ...columns],
        getCoreRowModel: getCoreRowModel(),
        state: {
            rowSelection,
            sorting,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
    });
    return (
        <table className="table">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table>
    );
}

function IndeterminateCheckbox({
    indeterminate,
    className = "",
    ...rest
}: { indeterminate?: boolean; } & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={`${className} cursor-pointer`}
            {...rest}
        />
    );
}
