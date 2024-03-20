import { FC, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { SorterResult } from "antd/es/table/interface";
import { useFetch } from "../../hooks/useFetch";
import { appService } from "../../services";
import { appController } from "../../controllers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Pagination } from "../../components/Pagination/Pagination";
import { itemsPerPageDefault } from "../../utils/constants";
import { Section } from "../../components/Section/Section";
import { PreloaderPortal } from "../../components/ui/Preloader/PreloaderPortal";
import { FetchItems } from "../../types/functions";
import { ICustomer } from "../../models/entities/customer.interface";
import { IGetCustomersResponse } from "../../models/responses/customer.response";
import { setCustomersPage, setCustomersPerPage } from "../../store/slices/customer.slice";
import { MessageService, messages } from "../../services/message.service";
import { CustomerTable } from "./components/CustomerTable";

export const CustomersPage: FC = () => {
    const dispatch = useAppDispatch();
    const customers = useAppSelector((state) => state.customer.customers);
    const totalItemsNum = useAppSelector((state) => state.customer.total);
    const page = useAppSelector((state) => state.customer.page);
    const perPage = useAppSelector((state) => state.customer.perPage);

    const { isLoading, makeRequest } = useFetch<IGetCustomersResponse>(true);
    const fetchCustomers: FetchItems<ICustomer> = useCallback(
        async (
            customersPage = 1,
            customersPerPage = itemsPerPageDefault,
            sorter?: SorterResult<ICustomer>,
            filter?: Record<string, string>,
        ) => {
            try {
                const response = await makeRequest(
                    async () => {
                        return appService.customers.getCustomers(
                            customersPage,
                            customersPerPage,
                            (sorter?.order) ? sorter.field as React.Key : undefined,
                            sorter?.order,
                            filter,
                        );
                    },
                );
                appController.customer.handleGetCustomers(response);
            } catch (error) {
                MessageService.error(messages.default);
            }
        }, [makeRequest]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const handlePageChange = async (value: number) => {
        await fetchCustomers(value, perPage);
        dispatch(setCustomersPage(value));
    };

    const handlePerPageChange = async (value: number) => {
        await fetchCustomers(1, value);
        dispatch(setCustomersPerPage(value));
    };
    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Section title="Customer List" name="section-customers">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header">
                            <div className="section__toolbar">
                                <Link to="../customers/add" relative="path" className="btn btn-add">
                                    <span className="btn__icon">+</span>
                                    <span className="btn__text">Add customer</span>
                                </Link>
                            </div>
                        </div>
                        <div className="card__body">
                            {customers ? (
                                <CustomerTable data={customers} fetchCustomers={fetchCustomers} />
                            ) : <p>No data</p>}
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
