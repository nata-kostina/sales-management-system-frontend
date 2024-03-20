import { FC, useState, useEffect, useCallback } from "react";
import { SorterResult } from "antd/es/table/interface";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { appController } from "../../../controllers";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Pagination } from "../../../components/Pagination/Pagination";
import { setSalesPage, setSalesPerPage } from "../../../store/slices/sale.slice";
import { itemsPerPageDefault } from "../../../utils/constants";
import { Section } from "../../../components/Section/Section";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { FetchItems } from "../../../types/functions";
import { ISale } from "../../../models/entities/sale.interface";
import { IGetSalesResponse } from "../../../models/responses/sales.response";
import { SaleTable } from "../components/SaleTable";
import { SaleFilter, TableFilter, TableFilterValue } from "../../../types/filters";
import { extractValuesFromFilter } from "../../../utils/helper";
import { TableToolbar } from "../../../components/Table/TableToolbar";

export const SaleViewPage: FC = () => {
    const dispatch = useAppDispatch();
    const sales = useAppSelector((state) => state.sale.sales);
    const { isLoading, makeRequest } = useFetch<IGetSalesResponse>(true);

    /* Pagination */
    const totalItemsNum = useAppSelector((state) => state.sale.total);
    const page = useAppSelector((state) => state.sale.page);
    const perPage = useAppSelector((state) => state.sale.perPage);
    const handlePageChange = async (value: number) => {
        await fetchSales(value, perPage);
        dispatch(setSalesPage(value));
    };

    const handlePerPageChange = async (value: number) => {
        await fetchSales(1, value);
        dispatch(setSalesPerPage(value));
    };

    /* Selected Records */
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    /* Filters */
    const [filter, setFilter] = useState<TableFilter<SaleFilter>>({} as TableFilter<SaleFilter>);
    const [sorter, setSorter] = useState<SorterResult<ISale>>();
    const [openFilter, setOpenFilter] = useState<Record<string, boolean>>({});
    const handleFilterSearch = (key: SaleFilter, value: TableFilterValue | TableFilterValue[] | null) => {
        setOpenFilter((prev) => ({ ...prev, [key]: false }));
        setFilter((prev) => ({ ...prev, [key]: value }));
    };
    const handleSortChange = (
        _sorter: SorterResult<ISale>,
    ) => {
        setSorter(_sorter);
    };
    const handleToggleFilter = (visible: boolean, key: string) => {
        setOpenFilter((prev) => ({ ...prev, [key]: visible }));
    };
    const changeFilter = (value: TableFilter<SaleFilter>) => {
        setFilter(value);
    };

    /* Sales */

    const fetchSales: FetchItems<ISale, SaleFilter> = useCallback(
        async (
            SalesPage = 1,
            SalesPerPage = itemsPerPageDefault,
            localSorter?: SorterResult<ISale>,
            localFilter?: TableFilter<SaleFilter>,
        ) => {
            try {
                const response = await makeRequest(
                    async () => {
                        return appService.sale.getSales(
                            SalesPage,
                            SalesPerPage,
                            (localSorter?.order) ? localSorter.field as React.Key : undefined,
                            localSorter?.order,
                            extractValuesFromFilter<SaleFilter>(localFilter),
                        );
                    },
                );
                appController.sale.handleGetSales(response);
            } catch (error) {
                console.error("Error - sales");
            }
        }, [makeRequest]);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    useEffect(() => {
        fetchSales(page, perPage, sorter, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorter, filter]);

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Section title="sale List" name="section-sales">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header">
                            <TableToolbar<SaleFilter> filter={filter} changeFilter={changeFilter} selectedNum={selectedRowKeys.length} />
                        </div>
                        <div className="card__body">
                            <SaleTable
                                data={sales}
                                fetchSales={fetchSales}
                                filter={filter}
                                sorter={sorter}
                                handleFilterSearch={handleFilterSearch}
                                handleSortChange={handleSortChange}
                                openFilter={openFilter}
                                handleToggleFilter={handleToggleFilter}
                                selectedRowKeys={selectedRowKeys}
                                onSelectChange={onSelectChange}
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
