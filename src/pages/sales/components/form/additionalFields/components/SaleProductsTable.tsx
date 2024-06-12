import { FC, useRef, useState } from "react";
import { Input, InputRef, App } from "antd";
import Column from "antd/es/table/Column";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { ISaleProduct } from "../../../../../../models/entities/saleProduct.interface";
import { Table } from "../../../../../../components/Table/Table";
import { ActionsCell } from "../../../../../../components/Table/ActionsCell";
import { baseURL } from "../../../../../../api";
import { assets } from "../../../../../../utils/assetsManager";

interface Props {
    products?: ISaleProduct[];
    updateQuantity: (id: string, value: number) => void;
    handleDeleteProduct: (id: string) => void;
}

export const SaleProductsTable: FC<Props> = ({ products, updateQuantity, handleDeleteProduct }) => {
    const { modal } = App.useApp();
    const handleOnDelete = (product: ISaleProduct) => {
        modal.confirm({
            title: `Are you sure you want to delete ${product.name}?`,
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                handleDeleteProduct(product.id);
            },
        });
    };
    return (
        <>
            <Table<ISaleProduct> data={products ?? []}>
                <Column<ISaleProduct>
                    key="name"
                    title="Product"
                    dataIndex="name"
                    render={(value, record) => (
                        <div className="col-img-text">
                            <div className="col__img-box">
                                {record.image ?
                                    <img src={`${baseURL}/${record.image.path}`} alt={record.image.originalname} className="col__img" /> :
                                    <img src={assets.shared.placeholder} alt="Placeholder" className="col__img" />
                                }
                            </div>
                            <h3 className="col__text">{value}</h3>
                        </div>
                    )}
                />
                <Column<ISaleProduct>
                    key="quantity"
                    title="Quantity"
                    dataIndex="quantity"
                    className="col-editable col-quantity"
                    render={(_text, record) => {
                        return (
                            <EditableField
                                id={record.id}
                                defaultValue={record.quantity}
                                updateQuantity={updateQuantity}
                            />
                        );
                    }}
                />
                <Column<ISaleProduct>
                    key="price"
                    title="Price per item"
                    dataIndex="price"
                />
                <Column<ISaleProduct>
                    key="total"
                    title="Total"
                    dataIndex="total"
                    render={(_, record) => <>{record.total}</>}
                />
                <Column<ISaleProduct>
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <ActionsCell
                            handleOnDelete={() => handleOnDelete(record)}
                            deleteTooltip="Delete product"
                        />
                    )}
                />
            </Table>
        </>
    );
};

interface EditableFieldProps {
    id: string;
    defaultValue: number;
    updateQuantity: (id: string, value: number) => void;
}

const EditableField: FC<EditableFieldProps> = ({ id, defaultValue, updateQuantity }) => {
    const [value, setValue] = useState(defaultValue);
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef | null>(null);

    const toggleEdit = () => {
        setEditing(!editing);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    };

    const save = () => {
        updateQuantity(id, value);
        setEditing(false);
    };

    return (
        <div className="form-items">
            {editing ? (
                <Input
                    value={value}
                    onChange={(e) => { setValue(+e.target.value); updateQuantity(id, +e.target.value); }}
                    onPressEnter={save}
                    onBlur={save}
                    type="number"
                    ref={inputRef}
                    min={1}
                />
            ) : (
                <div className="input" onClick={toggleEdit}>
                    {value}
                </div>
            )}
        </div>
    );
};
