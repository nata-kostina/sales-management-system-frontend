import { FC, useEffect, useState } from "react";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import { LocalPreloader } from "../../../components/ui/Preloader/LocalPreloader";
import { IGetBestsellersResponse } from "../../../models/responses/statistics.response";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { IProduct } from "../../../models/entities/product.interface";
import { baseURL } from "../../../api";
import { assets } from "../../../utils/assetsManager";

export const BestSellers: FC = () => {
    const { makeRequest, isLoading } = useFetch<IGetBestsellersResponse>(true);
    const [data, setData] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
                const response = await makeRequest(() => appService.statistics.getBestsellers());
                setData(response.products);
            } catch (error) {
                console.error("Error while fetching products");
            }
        };
        fetchBestsellers();
    }, []);
    return (
        <div className="card bestsellers-statistics">
            <div className="card__header">
                <h3 className="statistics__title">Bestsellers</h3>
            </div>
            <div className="card__body">
                {isLoading ? <LocalPreloader /> : (
                    <Table<IProduct>
                        id="app-table"
                        rowKey="id"
                        dataSource={data}
                        pagination={false}
                        className="app-table table-bestsellers"
                        scroll={{ x: true }}
                    >
                        <Column<IProduct>
                            key="name"
                            title="Name"
                            dataIndex="name"
                            render={(value, record) => (
                                <div className="col-img-text">
                                    <div className="col__img-box">
                                        {record.images.length > 0 ?
                                            <img src={`${baseURL}/${record.images[0].filename}`} className="col__img" /> :
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
                        />
                        <Column<IProduct>
                            key="sku"
                            title="SKU"
                            dataIndex="sku"
                        />
                        <Column<IProduct>
                            key="brand"
                            title="Brand"
                            dataIndex={["brand", "name"]}
                        />
                        <Column<IProduct> key="price" title="Price" dataIndex="price" />
                    </Table>
                )}
            </div>
        </div>
    );
};
