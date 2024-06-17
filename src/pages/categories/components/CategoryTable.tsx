import { FC } from "react";
import Column from "antd/es/table/Column";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Table/Table";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { baseURL } from "../../../api";
import { assets } from "../../../utils/assetsManager";
import { ICategory } from "../../../models/entities/category.interface";
import { CategoryFilter, TableFilterValue } from "../../../types/filters";
import { withLocalFilterValues } from "../../../hocs/TableWithLocalFilterValues";
import { WithLocalFilterValuesProps } from "../../../types/props";
import { content } from "../../../data/content";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { Sections } from "../../../types/entities";
import { getDisplayedValueFromItems } from "../../../utils/helper";
import { SearchFilter } from "../../../components/Table/SearchFilter";

interface Props extends Partial<WithLocalFilterValuesProps<CategoryFilter>> {
    data: ICategory[];
    openFilter: Record<CategoryFilter, boolean>;
    handleSortChange: (_sorter: SorterResult<ICategory>) => void;
    handleFilterSearch: (key: CategoryFilter, value: TableFilterValue | TableFilterValue[] | null) => void;
    handleToggleFilter: (visible: boolean, key: string) => void;
    selectedRowKeys: React.Key[];
    onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
    handleDelete: (items: string[]) => Promise<void>;
}

export const LocalCategoryTable: FC<Props> = ({
    data, filter, openFilter,
    handleToggleFilter, handleSortChange, handleFilterSearch,
    handleFilterDropdownOpenChange, changeLocalTableFilter,
    localTableFilter, selectedRowKeys, onSelectChange, handleDelete,
}) => {
    const { modalConfirm } = useModalOperationResult();

    const navigate = useNavigate();

    const handleOnEdit = (category: ICategory) => {
        navigate(`${category.id}/edit`);
    };

    const handleOnDelete = (category: ICategory) => {
        const value = getDisplayedValueFromItems([category], [category.id]);
        modalConfirm(content.confirm.delete(Sections.Categories, value),
            async () => {
                await handleDelete([category.id]);
            },
        );
    };

    const handleFilterDropdown = (visible: boolean, key: CategoryFilter) => {
        if (handleFilterDropdownOpenChange) {
            handleFilterDropdownOpenChange(key);
        }
        handleToggleFilter(visible, key);
    };

    const handleChangeLocalTableFilter = (key: CategoryFilter, value: TableFilterValue | TableFilterValue[] | null) => {
        if (changeLocalTableFilter) {
            changeLocalTableFilter(key, value);
        }
    };

    return (
        <>
            <Table<ICategory> handleOnChange={handleSortChange} data={data} selectedRowKeys={selectedRowKeys} onSelectChange={onSelectChange}>
                <Column<ICategory>
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
                            placeholder="Category name"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("name", value)}
                        />
                    )}
                    render={(value, record) => (
                        <div className="col-img-text">
                            <div className="col__img-box">
                                {record.images.length > 0 ?
                                    <img src={`${baseURL}/${record.images[0].path.replace("\\", "/")}`} alt={record.images[0].originalname} className="col__img" /> :
                                    <img src={assets.shared.placeholder} alt="Placeholder" className="col__img" />
                                }
                            </div>
                            <h3 className="col__text">{value}</h3>
                        </div>
                    )}
                />
                <Column<ICategory>
                    title="Description"
                    key="shortDescription"
                    dataIndex="shortDescription"
                    sorter={true}
                />
                <Column<ICategory>
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <ActionsCell
                            handleOnEdit={() => handleOnEdit(record)}
                            handleOnDelete={() => handleOnDelete(record)}
                            deleteTooltip="Delete category"
                            editTooltip="Edit category"
                        />
                    )}
                />
            </Table>
        </>
    );
};

export const CategoryTable = withLocalFilterValues<CategoryFilter, Props>(LocalCategoryTable);
