import { FC, useState } from "react";
import Column from "antd/es/table/Column";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { Table } from "../../../components/Table/Table";
import { useAppSelector } from "../../../store/hooks";
import { ActionsCell } from "../../../components/Table/ActionsCell";
import { baseURL } from "../../../api";
import { assets } from "../../../utils/assetsManager";
import { useFetch } from "../../../hooks/useFetch";
import { appService } from "../../../services";
import { PreloaderPortal } from "../../../components/ui/Preloader/PreloaderPortal";
import { FetchItems } from "../../../types/functions";
import { ICategory } from "../../../models/entities/category.interface";
import { IDeleteCategoryResponse } from "../../../models/responses/category.response";
import { MessageService } from "../../../services/message.service";

interface Props {
    data: ICategory[];
    fetchCategories: FetchItems<ICategory>;
}

export const CategoryTable: FC<Props> = ({ data, fetchCategories }) => {
    const { modal } = App.useApp();

    const [sorter, setSorter] = useState<SorterResult<ICategory>>();

    const page = useAppSelector((state) => state.category.page);
    const perPage = useAppSelector((state) => state.category.perPage);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const { makeRequest, isLoading } = useFetch<IDeleteCategoryResponse>();

    const navigate = useNavigate();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleOnChange = (
        _sorter: SorterResult<ICategory>,
    ) => {
        setSorter(_sorter);
        fetchCategories(page, perPage, _sorter);
    };

    const handleOnEdit = (category: ICategory) => {
        navigate(`${category.id}/edit`);
    };

    const handleOnDelete = (categories: ICategory[]) => {
        modal.confirm({
            title: categories.length === 1 ?
                `Are you sure you want to delete ${categories[0].name}?` :
                `Are you sure you want to delete ${categories.length} categories?`,
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    await makeRequest(() => appService.categories.deleteCategory({ categories: categories.map((p) => p.id) }));
                    fetchCategories(page, perPage, sorter);
                } catch {
                    MessageService.error(`Something went wrong. The ${categories.length > 0 ? "categories were" : "category was"} not deleted.`);
                }
            },
        });
    };

    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Table<ICategory> handleOnChange={handleOnChange} data={data} selectedRowKeys={selectedRowKeys} onSelectChange={onSelectChange}>
                <Column<ICategory>
                    key="name"
                    title="Name"
                    dataIndex="name"
                    sorter={true}
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
                            handleOnDelete={() => handleOnDelete([record])}
                            deleteTooltip="Delete category"
                            editTooltip="Edit category"
                        />
                    )}
                />
            </Table>
        </>
    );
};
