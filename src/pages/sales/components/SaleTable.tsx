import { FC } from "react";
import Column from "antd/es/table/Column";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Table/Table";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { SearchFilter } from "../../../components/Table/SearchFilter";
import { StatusFilter } from "./filters/StatusFilter";
import { ISale } from "../../../models/entities/sale.interface";
import { ICustomer } from "../../../models/entities/customer.interface";
import { ISaleStatus } from "../../../models/entities/saleStatus.interface";
import { IPayment } from "../../../models/entities/payment.interface";
import { PaymentFilter } from "./filters/PaymentFilter";
import { formatDateFromNumber, getDisplayedValueFromItems } from "../../../utils/helper";
import { SaleFilter, TableFilterValue } from "../../../types/filters";
import { withLocalFilterValues } from "../../../hocs/TableWithLocalFilterValues";
import { WithLocalFilterValuesProps } from "../../../types/props";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { Sections } from "../../../types/entities";

interface Props extends Partial<WithLocalFilterValuesProps<SaleFilter>> {
    data: ISale[];
    openFilter: Record<SaleFilter, boolean>;
    handleSortChange: (_sorter: SorterResult<ISale>) => void;
    handleFilterSearch: (key: SaleFilter, value: TableFilterValue | TableFilterValue[] | null) => void;
    handleToggleFilter: (visible: boolean, key: string) => void;
    selectedRowKeys: React.Key[];
    onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
    handleDelete: (items: string[]) => Promise<void>;
}

export const LocalSaleTable: FC<Props> = ({
    data, filter, openFilter,
    handleToggleFilter, handleSortChange, handleFilterSearch,
    handleFilterDropdownOpenChange, changeLocalTableFilter,
    localTableFilter, selectedRowKeys, onSelectChange, handleDelete,
}) => {
    const { modalConfirm } = useModalOperationResult();

    const navigate = useNavigate();

    const handleOnEdit = (sale: ISale) => {
        navigate(`${sale.id}/edit`);
    };

    const handleOnDelete = (sale: ISale) => {
        console.log({ sale });
        const value = getDisplayedValueFromItems([sale], [sale.id]);
        modalConfirm(content.confirm.delete(Sections.Sales, value),
            async () => {
                await handleDelete([sale.id]);
            },
        );
    };

    const handleFilterDropdown = (visible: boolean, key: SaleFilter) => {
        if (handleFilterDropdownOpenChange) {
            handleFilterDropdownOpenChange(key);
        }
        handleToggleFilter(visible, key);
    };

    const handleChangeLocalTableFilter = (key: SaleFilter, value: TableFilterValue | TableFilterValue[] | null) => {
        if (changeLocalTableFilter) {
            changeLocalTableFilter(key, value);
        }
    };

    return (
        <>
            <Table<ISale> handleOnChange={handleSortChange} data={data} selectedRowKeys={selectedRowKeys} onSelectChange={onSelectChange}>
                <Column<ISale>
                    key="reference"
                    title="Ref"
                    dataIndex="reference"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.reference}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "reference")}
                    filtered={!!(filter?.reference)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.reference as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("reference", value)}
                            placeholder="Reference"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("reference", value)}
                        />
                    )}
                />
                <Column<ISale>
                    title="Date"
                    key="date"
                    dataIndex="date"
                    sorter={true}
                    render={(value: number) => {
                        const dateValue = formatDateFromNumber(value);
                        return <>{dateValue}</>;
                    }}
                />
                <Column<ISale>
                    key="customer"
                    title="Customer"
                    dataIndex="customer"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.customer}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "customer")}
                    filtered={!!(filter?.customer)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.customer as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("customer", value)}
                            placeholder="Customer name"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("customer", value)}
                        />
                    )}
                    render={(value) => (
                        <>{(value as ICustomer).name}</>
                    )}
                />
                <Column<ISale>
                    key="customer.email"
                    title="Customer's e-mail"
                    dataIndex="customer"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.email}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "email")}
                    filtered={!!(filter?.email)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.email as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("email", value)}
                            placeholder="Customer e-mail"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("email", value)}
                        />
                    )}
                    render={(value) => (
                        <>{(value as ICustomer).email}</>
                    )}
                />
                <Column<ISale>
                    key="status"
                    title="Status"
                    dataIndex="status"
                    sorter={true}
                    render={(value) => (
                        <>{(value as ISaleStatus).name}</>
                    )}
                    filters={[]}
                    filterDropdownOpen={openFilter.status}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "status")}
                    filtered={!!(filter?.status)}
                    filterDropdown={(
                        <StatusFilter
                            localFilter={localTableFilter?.status as TableFilterValue[]}
                            changeLocalFilter={(value: TableFilterValue[] | null) => handleChangeLocalTableFilter("status", value)}
                            onSelect={(value: TableFilterValue[] | null) => handleFilterSearch("status", value)}
                        />
                    )}
                />
                <Column<ISale>
                    key="payment"
                    title="Payment"
                    dataIndex="payment"
                    sorter={true}
                    render={(value) => (
                        <>{(value as IPayment).name}</>
                    )}
                    filters={[]}
                    filterDropdownOpen={openFilter.payment}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "payment")}
                    filtered={!!(filter?.payment)}
                    filterDropdown={(
                        <PaymentFilter
                            localFilter={localTableFilter?.payment as TableFilterValue[]}
                            changeLocalFilter={(value: TableFilterValue[] | null) => handleChangeLocalTableFilter("payment", value)}
                            onSelect={(value: TableFilterValue[] | null) => handleFilterSearch("payment", value)}
                        />
                    )
                    }
                />
                <Column<ISale>
                    key="total"
                    title="Total"
                    dataIndex="total"
                    sorter={true}
                />
                <Column<ISale> key="paid" title="Paid" dataIndex="paid" sorter={true} />
                <Column<ISale>
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <ActionsCell
                            handleOnEdit={() => handleOnEdit(record)}
                            handleOnDelete={() => handleOnDelete(record)}
                            deleteTooltip="Delete sale"
                            editTooltip="Edit sale"
                        />
                    )}
                />
            </Table>
        </>
    );
};

export const SaleTable = withLocalFilterValues<SaleFilter, Props>(LocalSaleTable);
