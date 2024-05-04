import { FC, useEffect, useState } from "react";
import { appService } from "../../../services";
import { useAppSelector } from "../../../store/hooks";
import { Pagination } from "../../../components/Pagination/Pagination";
import { Section } from "../../../components/Section/Section";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { ICategory } from "../../../models/entities/category.interface";
import { CategoryTable } from "../components/CategoryTable";
import { useGetCategories } from "../../../hooks/categories/useGetCategories";
import { useDelete } from "../../../hooks/shared/useDelete";
import { useFilter } from "../../../hooks/shared/useFilter";
import { usePagination } from "../../../hooks/shared/usePagination";
import { useTableActions } from "../../../hooks/shared/useTableActions";
import { Sections } from "../../../types/entities";
import { CategoryFilter } from "../../../types/filters";
import { TableToolbar } from "../../../components/Table/TableToolbar";

export const CategoriesViewPage: FC = () => {
    /* Categories Hooks */
    const categories = useAppSelector((state) => state.category.categories);
    const { fetchCategories, isGetCategoriesLoading } = useGetCategories();
    const { deleteItems, isDeleteLoading } = useDelete({ section: "category" });

    /* Selected Items */
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys.map((item) => item.toString()));
    };

    /* Pagination Hook */
    const {
        page, perPage, totalItemsNum,
        handlePageChange, handlePerPageChange,
    } = usePagination({ fetchItems: fetchCategories, onSelectChange, slice: "category" });

    /* Table Filter Hook */
    const {
        filter, sorter, openFilter,
        handleFilterSearch, handleSortChange, handleToggleFilter, changeFilter,
    } = useFilter<ICategory, CategoryFilter>();

    /* Table Actions Hook */
    const { isCsvLoading, handleActionCsv, handleActionDelete, handleDeleteItems } = useTableActions({
        deleteItems,
        section: Sections.Categories,
        items: categories,
        selectedRowKeys,
        fetchCsv: async (payload) => {
            return appService.category.getCsv({ items: payload });
        },
        fetchItems: async () => {
            await fetchCategories(page, perPage, sorter, filter);
        },
    });

    /* Categories */
    useEffect(() => {
        fetchCategories(page, perPage, sorter, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorter, filter]);

    return (
        <>
            {(isGetCategoriesLoading || isDeleteLoading || isCsvLoading) && <PreloaderPortal />}
            <Section title="Category List" name="section-categories">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header">
                            <TableToolbar<CategoryFilter>
                                filter={filter}
                                changeFilter={changeFilter}
                                selectedItems={selectedRowKeys}
                                handleDelete={handleActionDelete}
                                handleCsv={handleActionCsv}
                                addBtnText="add category"
                            />
                        </div>
                        <div className="card__body">
                            <CategoryTable
                                data={categories}
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
