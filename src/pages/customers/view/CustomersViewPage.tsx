import { FC, useEffect, useState } from "react";
import { appService } from "../../../services";
import { useAppSelector } from "../../../store/hooks";
import { Pagination } from "../../../components/Pagination/Pagination";
import { Section } from "../../../components/Section/Section";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ICustomer } from "../../../models/entities/customer.interface";
import { CustomerTable } from "../components/CustomerTable";
import { useGetCustomers } from "../../../hooks/customers/useGetCustomers";
import { useDelete } from "../../../hooks/shared/useDelete";
import { usePagination } from "../../../hooks/shared/usePagination";
import { useFilter } from "../../../hooks/shared/useFilter";
import { useTableActions } from "../../../hooks/shared/useTableActions";
import { Sections } from "../../../types/entities";
import { CustomerFilter } from "../../../types/filters";
import { TableToolbar } from "../../../components/Table/TableToolbar";

export const CustomersViewPage: FC = () => {
    /* Customers Hooks */
    const customers = useAppSelector((state) => state.customer.customers);
    const { fetchCustomers, isGetCustomersLoading } = useGetCustomers();
    const { deleteItems, isDeleteLoading } = useDelete({ section: "customer" });

    /* Selected Items */
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys.map((item) => item.toString()));
    };

    /* Pagination Hook */
    const {
        page, perPage, totalItemsNum,
        handlePageChange, handlePerPageChange,
    } = usePagination({ fetchItems: fetchCustomers, onSelectChange, slice: "customer" });

    /* Table Filter Hook */
    const {
        filter, sorter, openFilter,
        handleFilterSearch, handleSortChange, handleToggleFilter, changeFilter,
    } = useFilter<ICustomer, CustomerFilter>();

    /* Table Actions Hook */
    const { isCsvLoading, handleActionCsv, handleActionDelete, handleDeleteItems } = useTableActions({
        deleteItems,
        section: Sections.Customers,
        items: customers,
        selectedRowKeys,
        fetchCsv: async (payload) => {
            return appService.customer.getCsv({ items: payload });
        },
        fetchItems: async () => {
            await fetchCustomers(page, perPage, sorter, filter);
        },
    });

    /* Customers */
    useEffect(() => {
        fetchCustomers(page, perPage, sorter, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorter, filter]);

    return (
        <>
            {(isGetCustomersLoading || isDeleteLoading || isCsvLoading) && <PreloaderPortal />}
            <Section title="Customer List" name="section-customers">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header">
                            <TableToolbar<CustomerFilter>
                                filter={filter}
                                changeFilter={changeFilter}
                                selectedItems={selectedRowKeys}
                                handleDelete={handleActionDelete}
                                handleCsv={handleActionCsv}
                                addBtnText="add customer"
                            />
                        </div>
                        <div className="card__body">
                            <CustomerTable
                                data={customers}
                                filter={filter}
                                handleFilterSearch={handleFilterSearch}
                                handleSortChange={handleSortChange}
                                openFilter={openFilter}
                                handleToggleFilter={handleToggleFilter}
                                selectedRowKeys={selectedRowKeys}
                                onSelectChange={onSelectChange}
                                handleDelete={handleDeleteItems}
                            />
                        </div>
                        <div className="card__footer">
                            <Pagination
                                totalItemsNum={totalItemsNum}
                                perPage={perPage}
                                page={page}
                                handlePageChange={handlePageChange}
                                handlePerPageChange={handlePerPageChange}
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};
