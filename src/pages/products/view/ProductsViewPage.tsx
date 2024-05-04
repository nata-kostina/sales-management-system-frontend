import { FC, useEffect, useState } from "react";
import { appService } from "../../../services";
import { useAppSelector } from "../../../store/hooks";
import { ProductTable } from "../components/ProductTable";
import { Pagination } from "../../../components/Pagination/Pagination";
import { Section } from "../../../components/Section/Section";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { IProduct } from "../../../models/entities/product.interface";
import { useGetProducts } from "../../../hooks/products/useGetProducts";
import { TableToolbar } from "../../../components/Table/TableToolbar";
import { useFilter } from "../../../hooks/shared/useFilter";
import { usePagination } from "../../../hooks/shared/usePagination";
import { useTableActions } from "../../../hooks/shared/useTableActions";
import { Sections } from "../../../types/entities";
import { ProductFilter } from "../../../types/filters";
import { useDelete } from "../../../hooks/shared/useDelete";

export const ProductsViewPage: FC = () => {
    /* Products Hooks */
    const products = useAppSelector((state) => state.product.products);
    const { fetchProducts, isGetProductsLoading } = useGetProducts();
    const { deleteItems, isDeleteLoading } = useDelete({ section: "product" });

    /* Selected Items */
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys.map((item) => item.toString()));
    };

    /* Pagination Hook */
    const {
        page, perPage, totalItemsNum,
        handlePageChange, handlePerPageChange,
    } = usePagination({ fetchItems: fetchProducts, onSelectChange, slice: "product" });

    /* Table Filter Hook */
    const {
        filter, sorter, openFilter,
        handleFilterSearch, handleSortChange, handleToggleFilter, changeFilter,
    } = useFilter<IProduct, ProductFilter>();

    /* Table Actions Hook */
    const { isCsvLoading, handleActionCsv, handleActionDelete, handleDeleteItems } = useTableActions({
        deleteItems,
        section: Sections.Products,
        items: products,
        selectedRowKeys,
        fetchCsv: async (payload) => {
            return appService.product.getCsv({ items: payload });
        },
        fetchItems: async () => {
            await fetchProducts(page, perPage, sorter, filter);
        },
    });

    /* Products */
    useEffect(() => {
        fetchProducts(page, perPage, sorter, filter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorter, filter]);

    return (
        <>
            {(isGetProductsLoading || isDeleteLoading || isCsvLoading) && <PreloaderPortal />}
            <Section title="Product List" name="section-products">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header">
                            <TableToolbar<ProductFilter>
                                filter={filter}
                                changeFilter={changeFilter}
                                selectedItems={selectedRowKeys}
                                handleDelete={handleActionDelete}
                                handleCsv={handleActionCsv}
                                addBtnText="add product"
                            />
                        </div>
                        <div className="card__body">
                            <ProductTable
                                data={products}
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
