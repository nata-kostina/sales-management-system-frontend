import { FC } from "react";
import Column from "antd/es/table/Column";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Table/Table";
import { useAppSelector } from "../../../store/hooks";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { SearchFilter } from "../../../components/Table/SearchFilter";
import { StatusFilter } from "./filters/StatusFilter";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ISale } from "../../../models/entities/sale.interface";
import { IDeleteSaleResponse } from "../../../models/responses/sales.response";
import { FetchItems } from "../../../types/functions";
import { ICustomer } from "../../../models/entities/customer.interface";
import { ISaleStatus } from "../../../models/entities/saleStatus.interface";
import { IPayment } from "../../../models/entities/payment.interface";
import { PaymentFilter } from "./filters/PaymentFilter";
import { formatDateFromString } from "../../../utils/helper";
import { SaleFilter, TableFilterValue } from "../../../types/filters";
import { withLocalFilterValues } from "../../../hocs/TableWithLocalFilterValues";
import { WithLocalFilterValuesProps } from "../../../types/props";

interface Props extends Partial<WithLocalFilterValuesProps<SaleFilter>> {
    data: ISale[];
    fetchSales: FetchItems<ISale, SaleFilter>;
    sorter?: SorterResult<ISale>;
    openFilter: Record<string, boolean>;
    handleSortChange: (_sorter: SorterResult<ISale>) => void;
    handleFilterSearch: (key: SaleFilter, value: TableFilterValue | TableFilterValue[] | null) => void;
    handleToggleFilter: (visible: boolean, key: string) => void;
    selectedRowKeys: React.Key[];
    onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
}

export const LocalSaleTable: FC<Props> = ({
    data, fetchSales, filter, openFilter, sorter,
    handleToggleFilter, handleSortChange, handleFilterSearch,
    handleFilterDropdownOpenChange, changeLocalTableFilter,
    localTableFilter, selectedRowKeys, onSelectChange,
}) => {
    const { modal } = App.useApp();

    const page = useAppSelector((state) => state.sale.page);
    const perPage = useAppSelector((state) => state.sale.perPage);

    const { makeRequest, isLoading } = useFetch<IDeleteSaleResponse>();
    const navigate = useNavigate();

    const handleOnEdit = (sale: ISale) => {
        navigate(`${sale.id}/edit`);
    };

    const handleOnDelete = (sales: ISale[]) => {
        modal.confirm({
            title: sales.length === 1 ?
                <span>Are you sure you want to delete the sale Ref&nbsp;{sales[0].reference}?</span> :
                <span>Are you sure you want to delete ${sales.length} sales?</span>,
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    await makeRequest(() => appService.sale.deleteSale({ sales: sales.map((p) => p.id) }));
                    fetchSales(page, perPage, sorter, filter);
                    modal.success({
                        content: sales.length === 1 ?
                            <span>The sale Ref&nbsp;{sales[0].reference} was successfully deleted.</span> :
                            <span>The sales were successfully deleted.</span>,
                    });
                } catch {
                    modal.error({ content: `Something went wrong. The ${sales.length > 0 ? "sales were" : "sale was"} not deleted.` });
                }
            },
        });
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
            {isLoading && <PreloaderPortal />}
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
                    render={(value: string) => {
                        const dateValue = formatDateFromString(value);
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
                            handleOnDelete={() => handleOnDelete([record])}
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
