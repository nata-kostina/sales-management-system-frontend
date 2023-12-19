import { FC } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { IProduct } from "../../../models/product.interface";
import { Table } from "../../../components/Table/Table";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { TableHeader } from "../../../components/Table/TableHeader";

interface Props {
    data: IProduct[];
}
const columnHelper = createColumnHelper<IProduct>();
const columns = [
    columnHelper.accessor(row => ({
        images: row.images,
        name: row.name,
    }), {
        id: "name",
        cell: info => {
            const images = info.getValue().images;
            return (
                <div className="fx fx-hor gap-m">
                    {images.length > 0 && (
                        <img
                            key={images[0].name}
                            style={{
                                width: "40px",
                                maxHeight: "40px",
                            }}
                            src={images[0].src}
                            alt={images[0].name}
                        />
                    )}
                    <h3>{info.getValue().name}</h3>
                </div>
            );
        },
        header: () => <TableHeader text="Product Name" />,
    }),
    columnHelper.accessor(row => row.sku, {
        id: "sku",
        cell: info => info.getValue(),
        header: "SKU",
    }),
    columnHelper.accessor(row => row.brand, {
        id: "brand",
        cell: (info) => <>{info.getValue()?.name ?? ""}</>,
        header: "Brand",
    }),
    columnHelper.accessor(row => row.price, {
        id: "price",
        cell: info => info.getValue(),
        header: "Price",
    }),
    columnHelper.accessor(row => row.unit, {
        id: "unit",
        cell: (info) => <>{info.getValue()?.name ?? ""}</>,
        header: "Unit",
    }),
    columnHelper.accessor(row => row.quantity, {
        id: "quantity",
        cell: info => info.getValue(),
        header: "Qty",
    }),
    columnHelper.accessor(row => ({ id: row.id }), {
        id: "actions",
        cell: (info) => <ActionsCell id={info.getValue().id} />,
        header: "Actions",
    }),
];

export const ProductTable: FC<Props> = ({ data }) => {
    // const { makeRequest, isLoading } = useFetch<IDeleteProduct>();
    // const handleDelete = async (id: string) => {
    //     try {
    //         await makeRequest(() => {
    //             return appService.products.deleteProduct(id);
    //         });
    //     } catch (error) {

    //     }
    // };
    // const actionsColumn = columnHelper.accessor(row => ({ id: row.id }), {
    //     id: "actions",
    //     cell: (info) => <ActionsCell id={info.getValue().id} handleDelete={handleDelete} />,
    //     header: "Actions",
    // });
    return (
        <div>
            <Table data={data} columns={columns} />
        </div>
    );
};
