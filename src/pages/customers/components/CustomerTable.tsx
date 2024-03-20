import { FC, useState } from "react";
import Column from "antd/es/table/Column";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Table/Table";
import { useAppSelector } from "../../../store/hooks";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { SearchFilter } from "../../../components/Table/SearchFilter";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ICustomer } from "../../../models/entities/customer.interface";
import { FetchItems } from "../../../types/functions";
import { MessageService } from "../../../services/message.service";
import { IDeleteCustomerResponse } from "../../../models/responses/customer.response";

interface Props {
    data: ICustomer[];
    fetchCustomers: FetchItems<ICustomer>;
}

export const CustomerTable: FC<Props> = ({ data, fetchCustomers }) => {
    const { modal } = App.useApp();

    const [filter, setFilter] = useState<Record<string, string>>({});
    const [sorter, setSorter] = useState<SorterResult<ICustomer>>();
    const [openFilter, setOpenFilter] = useState<Record<keyof Pick<ICustomer, "name" | "email" | "phone" | "country" | "city">, boolean>>(
        { name: false, email: false, phone: false, country: false, city: false },
    );
    const page = useAppSelector((state) => state.customer.page);
    const perPage = useAppSelector((state) => state.customer.perPage);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const { makeRequest, isLoading } = useFetch<IDeleteCustomerResponse>();

    const navigate = useNavigate();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleOnChange = (
        _sorter: SorterResult<ICustomer>,
    ) => {
        setSorter(_sorter);
        fetchCustomers(page, perPage, _sorter, filter);
    };

    const handleOnEdit = (customer: ICustomer) => {
        navigate(`${customer.id}/edit`);
    };

    const handleOnDelete = (customers: ICustomer[]) => {
        modal.confirm({
            title: customers.length === 1 ?
                `Are you sure you want to delete ${customers[0].name}?` :
                `Are you sure you want to delete ${customers.length} customers?`,
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    await makeRequest(() => appService.customers.deleteCustomer({ customers: customers.map((p) => p.id) }));
                    fetchCustomers(page, perPage, sorter, filter);
                } catch {
                    MessageService.error(`Something went wrong. The ${customers.length > 0 ? "customers were" : "customer was"} not deleted.`);
                }
            },
        });
    };

    const handleFilterSearch = (key: keyof ICustomer, value: string) => {
        setOpenFilter((prev) => ({ ...prev, [key]: false }));
        setFilter((prev) => ({ ...prev, [key]: value }));
        fetchCustomers(page, perPage, sorter, { ...filter, [key]: value });
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Table<ICustomer> handleOnChange={handleOnChange} data={data} selectedRowKeys={selectedRowKeys} onSelectChange={onSelectChange}>
                <Column<ICustomer>
                    key="name"
                    title="Name"
                    dataIndex="name"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.name}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, name: !openFilter.name }))}
                    filtered={!!(filter.name) && filter.name.length > 0}
                    filterDropdown={<SearchFilter placeholder="Customer name" onSearch={(value: string) => handleFilterSearch("name", value)} />}
                />
                <Column<ICustomer>
                    key="email"
                    title="Email"
                    dataIndex="email"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.email}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, email: !openFilter.email }))}
                    filtered={!!(filter.email) && filter.email.length > 0}
                    filterDropdown={<SearchFilter placeholder="Customer email" onSearch={(value: string) => handleFilterSearch("email", value)} />}
                />
                <Column<ICustomer>
                    key="phone"
                    title="Phone"
                    dataIndex="phone"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.phone}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, phone: !openFilter.phone }))}
                    filtered={!!(filter.phone) && filter.phone.length > 0}
                    filterDropdown={<SearchFilter placeholder="Phone" onSearch={(value: string) => handleFilterSearch("phone", value)} />}
                />
                <Column<ICustomer>
                    title="Country"
                    key="country"
                    dataIndex={["country", "name"]}
                    filters={[]}
                    filterDropdownOpen={openFilter.country}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, country: !openFilter.country }))}
                    filtered={!!(filter.country) && filter.country.length > 0}
                    filterDropdown={<SearchFilter placeholder="Country" onSearch={(value: string) => handleFilterSearch("country", value)} />}
                />
                <Column<ICustomer>
                    title="City"
                    key="city"
                    dataIndex={["city", "name"]}
                    filters={[]}
                    filterDropdownOpen={openFilter.city}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, city: !openFilter.city }))}
                    filtered={!!(filter.city) && filter.city.length > 0}
                    filterDropdown={<SearchFilter placeholder="City" onSearch={(value: string) => handleFilterSearch("city", value)} />}
                />
                <Column<ICustomer>
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <ActionsCell
                            handleOnEdit={() => handleOnEdit(record)}
                            handleOnDelete={() => handleOnDelete([record])}
                            deleteTooltip="Delete customer"
                            editTooltip="Edit customer"
                        />
                    )}
                />
            </Table>
        </>
    );
};
