import { FC, useState, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { Pagination } from "../../../components/Pagination/Pagination";
import { Section } from "../../../components/Section/Section";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ISale } from "../../../models/entities/sale.interface";
import { SaleTable } from "../components/SaleTable";
import { SaleFilter } from "../../../types/filters";
import { TableToolbar } from "../../../components/Table/TableToolbar";
import { useGetSales } from "../../../hooks/sales/useGetSales";
import { Sections } from "../../../types/entities";
import { appService } from "../../../services";
import { useTableActions } from "../../../hooks/shared/useTableActions";
import { useFilter } from "../../../hooks/shared/useFilter";
import { usePagination } from "../../../hooks/shared/usePagination";
import { useDelete } from "../../../hooks/shared/useDelete";

export const SalesViewPage: FC = () => {
    /* Sales Hooks */
    const sales = useAppSelector((state) => state.sale.sales);
    const { fetchSales, isGetSalesLoading } = useGetSales();
    const { deleteItems, isDeleteLoading } = useDelete({ section: "sale" });

    /* Selected Items */
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys.map((item) => item.toString()));
    };

    /* Pagination Hook */
    const {
        page, perPage, totalItemsNum,
        handlePageChange, handlePerPageChange,
    } = usePagination({ fetchItems: fetchSales, onSelectChange, slice: "sale" });

    /* Table Filter Hook */
    const {
        filter, sorter, openFilter,
        handleFilterSearch, handleSortChange, handleToggleFilter, changeFilter,
    } = useFilter<ISale, SaleFilter>();

    /* Table Actions Hook */
    const { isCsvLoading, handleActionCsv, handleActionDelete, handleDeleteItems } = useTableActions({
        deleteItems,
        section: Sections.Sales,
        items: sales,
        selectedRowKeys,
        fetchCsv: async (payload) => {
            return appService.sale.getCsv({ items: payload });
        },
        fetchItems: async () => {
            await fetchSales(page, perPage, sorter, filter);
        },
    });

    /* Sales */
    useEffect(() => {
        fetchSales(page, perPage, sorter, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorter, filter]);

    return (
        <>
            {(isGetSalesLoading || isDeleteLoading || isCsvLoading) && <PreloaderPortal />}
            <Section title="sale list" name="section-sales">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header">
                            <TableToolbar<SaleFilter>
                                filter={filter}
                                changeFilter={changeFilter}
                                selectedItems={selectedRowKeys}
                                handleDelete={handleActionDelete}
                                handleCsv={handleActionCsv}
                                addBtnText="add sale"
                            />
                        </div>
                        <div className="card__body">
                            <SaleTable
                                data={sales}
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

const streets: string[] = ["Maple", "Oak", "Cedar", "Elm", "Pine", "Main", "Elmwood", "Park", "Washington", "Lake"];
const streetSuffixes: string[] = ["Street", "Avenue", "Road", "Boulevard", "Parkway", "Heights"];
const apartmentNumbers: string[] = ["101", "202", "303", "404", "505", "606", "707", "808", "909", "1001"];

export function generateRandomAddress(): string {
    // Generate a random street name
    const randomStreetIndex: number = Math.floor(Math.random() * streets.length);
    const randomStreet: string = streets[randomStreetIndex];

    // Generate a random street suffix
    const randomSuffixIndex: number = Math.floor(Math.random() * streetSuffixes.length);
    const randomSuffix: string = streetSuffixes[randomSuffixIndex];

    // Generate a random house number (between 1 and 100)
    const randomHouseNumber: number = Math.floor(Math.random() * 100) + 1;

    // Generate a random apartment number
    const randomApartmentNumber: string = apartmentNumbers[Math.floor(Math.random() * apartmentNumbers.length)];

    // Concatenate street, suffix, house number, and apartment number into a single string
    return `${randomStreet} ${randomSuffix} ${randomHouseNumber}, Apt. ${randomApartmentNumber}`;
}
