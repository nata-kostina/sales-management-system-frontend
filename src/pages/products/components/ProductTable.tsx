import { FC, useState } from "react";
import Column from "antd/es/table/Column";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../models/product.interface";
import { TableNew } from "../../../components/Table/TableNew";
import { useAppSelector } from "../../../store/hooks";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { SearchFilter } from "../../../components/Table/SearchFilter";
import { FetchProducts } from "../../../types/functions.type";
import { CategoryFilter } from "./filters/CategoryFilter";
import { BrandFilter } from "./filters/BrandFilter";
import { UnitFilter } from "./filters/UnitFilter";
import { baseURL } from "../../../api";
import { assets } from "../../../utils/assetsManager";
import { useFetch } from "../../../hooks/useFetch";
import { IDeleteProductResponse } from "../../../models/response/IDeleteProductResponse";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";

interface Props {
    data: IProduct[];
    fetchProducts: FetchProducts;
}

const { confirm } = Modal;

export const ProductTable: FC<Props> = ({ data, fetchProducts }) => {
    const [filter, setFilter] = useState<Record<string, string>>({});
    const [sorter, setSorter] = useState<SorterResult<IProduct>>();
    const [openFilter, setOpenFilter] = useState<Record<keyof Pick<IProduct, "name" | "categories" | "sku" | "brand" | "unit">, boolean>>(
        { name: false, categories: false, sku: false, brand: false, unit: false },
    );
    const page = useAppSelector((state) => state.product.page);
    const perPage = useAppSelector((state) => state.product.perPage);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const { makeRequest, isLoading } = useFetch<IDeleteProductResponse>();

    const navigate = useNavigate();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleOnChange = (
        _sorter: SorterResult<IProduct>,
    ) => {
        setSorter(_sorter);
        fetchProducts(page, perPage, _sorter, filter);
    };

    const handleOnEdit = (product: IProduct) => {
        navigate(`${product.id}/edit`);
    };

    const handleOnDelete = (products: IProduct[]) => {
        confirm({
            title: products.length === 1 ?
                `Are you sure you want to delete ${products[0].name}?` :
                `Are you sure you want to delete ${products.length} products?`,
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    await makeRequest(() => appService.products.deleteProduct({ products: products.map((p) => p.id) }));
                    fetchProducts(page, perPage, sorter, filter);
                } catch {
                    console.error("on delete error");
                }
            },
        });
    };

    const handleFilterSearch = (key: keyof IProduct, value: string) => {
        setOpenFilter((prev) => ({ ...prev, [key]: false }));
        setFilter((prev) => ({ ...prev, [key]: value }));
        fetchProducts(page, perPage, sorter, { ...filter, [key]: value });
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <TableNew<IProduct> handleOnChange={handleOnChange} data={data} selectedRowKeys={selectedRowKeys} onSelectChange={onSelectChange}>
                <Column<IProduct>
                    key="name"
                    title="Name"
                    dataIndex="name"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.name}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, name: !openFilter.name }))}
                    filtered={!!(filter.name) && filter.name.length > 0}
                    filterDropdown={<SearchFilter placeholder="Product name" onSearch={(value: string) => handleFilterSearch("name", value)} />}
                    render={(value, record) => (
                        <div className="col-name">
                            <div className="product__img-box">
                                {record.images.length > 0 ?
                                    <img src={`${baseURL}/${record.images[0].filename}`} className="product__img" /> :
                                    <img src={assets.shared.placeholder} alt="Placeholder" className="product__img" />
                                }
                            </div>
                            <h3 className="product__name">{value}</h3>
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
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, categories: !openFilter.categories }))}
                    filtered={!!(filter.categories) && filter.categories.length > 0}
                    filterDropdown={<CategoryFilter isOpen={openFilter.categories} onSelect={(value: string) => handleFilterSearch("categories", value)} />}
                />
                <Column<IProduct>
                    key="sku"
                    title="SKU"
                    dataIndex="sku"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.sku}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, sku: !openFilter.name }))}
                    filtered={!!(filter.sku) && filter.sku.length > 0}
                    filterDropdown={<SearchFilter placeholder="SKU" onSearch={(value: string) => handleFilterSearch("sku", value)} />}
                />
                <Column<IProduct>
                    key="brand"
                    title="Brand"
                    dataIndex="brand"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.brand}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, brand: !openFilter.brand }))}
                    filtered={!!(filter.brand) && filter.brand.length > 0}
                    filterDropdown={<BrandFilter isOpen={openFilter.brand} onSelect={(value: string) => handleFilterSearch("brand", value)} />}
                />
                <Column<IProduct> key="price" title="Price" dataIndex="price" sorter={true} />
                <Column<IProduct>
                    key="unit"
                    title="Unit"
                    dataIndex="unit"
                    sorter={true}
                    filters={[]}
                    filterDropdownOpen={openFilter.unit}
                    onFilterDropdownOpenChange={() => setOpenFilter((prev) => ({ ...prev, unit: !openFilter.unit }))}
                    filtered={!!(filter.unit) && filter.unit.length > 0}
                    filterDropdown={<UnitFilter isOpen={openFilter.unit} onSelect={(value: string) => handleFilterSearch("unit", value)} />}
                />
                <Column<IProduct> key="quantity" title="Qty" dataIndex="quantity" sorter={true} />
                <Column<IProduct>
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <ActionsCell handleOnEdit={() => handleOnEdit(record)} handleOnDelete={() => handleOnDelete([record])} />
                    )}
                />
            </TableNew>
        </>
    );
};
