import { FC } from "react";
import Column from "antd/es/table/Column";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Table/Table";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { SearchFilter } from "../../../components/Table/SearchFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { BrandFilter } from "./filters/BrandFilter";
import { baseURL } from "../../../api";
import { assets } from "../../../utils/assetsManager";
import { IProduct } from "../../../models/entities/product.interface";
import { ProductFilter, TableFilterValue } from "../../../types/filters";
import { withLocalFilterValues } from "../../../hocs/TableWithLocalFilterValues";
import { WithLocalFilterValuesProps } from "../../../types/props";
import { useModalOperationResult } from "../../../hooks/shared/useModalOperationResult";
import { content } from "../../../data/content";
import { Sections } from "../../../types/entities";
import { getDisplayedValueFromItems } from "../../../utils/helper";
import { UnitFilter } from "./filters/UnitFilter";

interface Props extends Partial<WithLocalFilterValuesProps<ProductFilter>> {
    data: IProduct[];
    openFilter: Record<ProductFilter, boolean>;
    selectedRowKeys: React.Key[];
    handleSortChange: (_sorter: SorterResult<IProduct>) => void;
    handleFilterSearch: (key: ProductFilter, value: TableFilterValue | TableFilterValue[] | null) => void;
    handleToggleFilter: (visible: boolean, key: string) => void;
    onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
    handleDelete: (items: string[]) => Promise<void>;
}

export const LocalProductTable: FC<Props> = (
    {
        data, filter, openFilter, localTableFilter, selectedRowKeys,
        handleToggleFilter, handleSortChange, handleFilterSearch,
        handleFilterDropdownOpenChange, changeLocalTableFilter,
        onSelectChange, handleDelete,
    },
) => {
    const { modalConfirm } = useModalOperationResult();

    const navigate = useNavigate();

    const handleOnEdit = (product: IProduct) => {
        navigate(`${product.id}/edit`);
    };

    const handleOnDelete = (product: IProduct) => {
        const value = getDisplayedValueFromItems([product], [product.id]);
        modalConfirm(content.confirm.delete(Sections.Products, value),
            async () => {
                await handleDelete([product.id]);
            },
        );
    };

    const handleFilterDropdown = (visible: boolean, key: ProductFilter) => {
        if (handleFilterDropdownOpenChange) {
            handleFilterDropdownOpenChange(key);
        }
        handleToggleFilter(visible, key);
    };

    const handleChangeLocalTableFilter = (key: ProductFilter, value: TableFilterValue | TableFilterValue[] | null) => {
        if (changeLocalTableFilter) {
            changeLocalTableFilter(key, value);
        }
    };

    return (
        <>
            <Table<IProduct> handleOnChange={handleSortChange} data={data} selectedRowKeys={selectedRowKeys} onSelectChange={onSelectChange}>
                <Column<IProduct>
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
                            placeholder="Product name"
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
                <Column<IProduct>
                    title="Category"
                    key="categories"
                    dataIndex="categories"
                    render={(_text, product) => {
                        return (
                            <div className="col-category">
                                {product.categories?.map((c) => <div className="category" key={c.id}>{c.name}</div>)}
                            </div>
                        );
                    }}
                    filters={[]}
                    filterDropdownOpen={openFilter.categories}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "categories")}
                    filtered={!!(filter?.categories)}
                    filterDropdown={(
                        <CategoryFilter
                            localFilter={localTableFilter?.categories as TableFilterValue[]}
                            changeLocalFilter={(value: TableFilterValue[] | null) => handleChangeLocalTableFilter("categories", value)}
                            onSelect={(value: TableFilterValue[] | null) => handleFilterSearch("categories", value)}
                        />
                    )}
                />
                <Column<IProduct>
                    key="sku"
                    title="SKU"
                    dataIndex="sku"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.sku}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "sku")}
                    filtered={!!(filter?.sku)}
                    filterDropdown={(
                        <SearchFilter
                            localFilter={localTableFilter?.sku as TableFilterValue}
                            changeLocalFilter={(value: TableFilterValue | null) => handleChangeLocalTableFilter("sku", value)}
                            placeholder="SKU"
                            onSearch={(value: TableFilterValue | null) => handleFilterSearch("sku", value)}
                        />
                    )}
                />
                <Column<IProduct>
                    key="brand"
                    title="Brand"
                    dataIndex={["brand", "name"]}
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.brand}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "brand")}
                    filtered={!!(filter?.brand)}
                    filterDropdown={(
                        <BrandFilter
                            localFilter={localTableFilter?.brand as TableFilterValue[]}
                            changeLocalFilter={(value: TableFilterValue[] | null) => handleChangeLocalTableFilter("brand", value)}
                            onSelect={(value: TableFilterValue[] | null) => handleFilterSearch("brand", value)}
                        />
                    )}
                />
                <Column<IProduct> key="price" title="Price" dataIndex="price" sorter={true} />
                <Column<IProduct>
                    key="unit"
                    title="Unit"
                    dataIndex={["unit", "name"]}
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.unit}
                    onFilterDropdownOpenChange={(visible) => handleFilterDropdown(visible, "unit")}
                    filtered={!!(filter?.unit)}
                    filterDropdown={(
                        <UnitFilter
                            localFilter={localTableFilter?.unit as TableFilterValue[]}
                            changeLocalFilter={(value: TableFilterValue[] | null) => handleChangeLocalTableFilter("unit", value)}
                            onSelect={(value: TableFilterValue[] | null) => handleFilterSearch("unit", value)}
                        />
                    )}
                />
                <Column<IProduct> key="quantity" title="Qty" dataIndex="quantity" sorter={true} />
                <Column<IProduct>
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <ActionsCell
                            handleOnEdit={() => handleOnEdit(record)}
                            handleOnDelete={() => handleOnDelete(record)}
                            deleteTooltip="Delete product"
                            editTooltip="Edit product"
                        />
                    )}
                />
            </Table>
        </>
    );
};

export const ProductTable = withLocalFilterValues<ProductFilter, Props>(LocalProductTable);
