import { FC } from "react";
import Column from "antd/es/table/Column";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Table/Table";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { SearchFilter } from "../../../components/Table/SearchFilter";
import { ICustomer } from "../../../models/entities/customer.interface";
import { CustomerFilter, TableFilterValue } from "../../../types/filters";
import { WithLocalFilterValuesProps } from "../../../types/props";
import { content } from "../../../data/content";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { Sections } from "../../../types/entities";
import { getDisplayedValueFromItems } from "../../../utils/helper";
import { withLocalFilterValues } from "../../../hocs/TableWithLocalFilterValues";

interface Props extends Partial<WithLocalFilterValuesProps<CustomerFilter>> {
    data: ICustomer[];
    openFilter: Record<CustomerFilter, boolean>;
    handleSortChange: (_sorter: SorterResult<ICustomer>) => void;
    handleFilterSearch: (key: CustomerFilter, value: TableFilterValue | TableFilterValue[] | null) => void;
    handleToggleFilter: (visible: boolean, key: string) => void;
    selectedRowKeys: React.Key[];
    onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
    handleDelete: (items: string[]) => Promise<void>;
}
export const LocalCustomerTable: FC<Props> = ({
    data, filter, openFilter,
    handleToggleFilter, handleSortChange, handleFilterSearch,
    handleFilterDropdownOpenChange, changeLocalTableFilter,
    localTableFilter, selectedRowKeys, onSelectChange, handleDelete,
}) => {
    const { modalConfirm } = useModalOperationResult();

    const navigate = useNavigate();

    const handleOnEdit = (customer: ICustomer) => {
        navigate(`${customer.id}/edit`);
    };

    const handleOnDelete = (customer: ICustomer) => {
        const value = getDisplayedValueFromItems([customer], [customer.id]);
        modalConfirm(content.confirm.delete(Sections.Customers, value),
            async () => {
                await handleDelete([customer.id]);
            },
        );
    };

    const handleFilterDropdown = (visible: boolean, key: CustomerFilter) => {
        if (handleFilterDropdownOpenChange) {
            handleFilterDropdownOpenChange(key);
        }
        handleToggleFilter(visible, key);
    };

    const handleChangeLocalTableFilter = (key: CustomerFilter, value: TableFilterValue | TableFilterValue[] | null) => {
        if (changeLocalTableFilter) {
            changeLocalTableFilter(key, value);
        }
    };

    return (
        <>
            <Table<ICustomer> handleOnChange={handleSortChange} data={data} selectedRowKeys={selectedRowKeys} onSelectChange={onSelectChange}>
                <Column<ICustomer>
                    key="name"
                    title="Name"
                    dataIndex="name"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.name}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "name")}
                    filtered={!!(filter?.name)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.name as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("name", value)}
                            placeholder="Customer name"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("name", value)}
                        />
                    )}
                />
                <Column<ICustomer>
                    key="email"
                    title="Email"
                    dataIndex="email"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.email}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "email")}
                    filtered={!!(filter?.email)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.email as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("email", value)}
                            placeholder="Customer email"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("email", value)}
                        />
                    )}
                />
                <Column<ICustomer>
                    key="phone"
                    title="Phone"
                    dataIndex="phone"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.phone}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "phone")}
                    filtered={!!(filter?.phone)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.phone as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("phone", value)}
                            placeholder="Phone"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("phone", value)}
                        />
                    )}
                />
                <Column<ICustomer>
                    title="Country"
                    key="country"
                    dataIndex={["country", "name"]}
                    filters={[]}
                    filterDropdownOpen={openFilter.country}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "country")}
                    filtered={!!(filter?.country)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.country as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("country", value)}
                            placeholder="Country"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("country", value)}
                        />
                    )}
                />
                <Column<ICustomer>
                    title="City"
                    key="city"
                    dataIndex={["city", "name"]}
                    filters={[]}
                    filterDropdownOpen={openFilter.city}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "city")}
                    filtered={!!(filter?.city)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.city as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("city", value)}
                            placeholder="City"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("city", value)}
                        />
                    )}
                />
                <Column<ICustomer>
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <ActionsCell
                            handleOnEdit={() => handleOnEdit(record)}
                            handleOnDelete={() => handleOnDelete(record)}
                            deleteTooltip="Delete customer"
                            editTooltip="Edit customer"
                        />
                    )}
                />
            </Table>
        </>
    );
};

export const CustomerTable = withLocalFilterValues<CustomerFilter, Props>(LocalCustomerTable);
