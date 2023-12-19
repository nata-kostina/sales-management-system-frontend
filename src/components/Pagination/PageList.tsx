import { FC } from "react";
import { Pagination } from "antd";

interface Props {
    total: number;
    page: number;
    handlePageChange: (page: number) => void;
}

export const PageList: FC<Props> = ({ page, total, handlePageChange }) => {
    // const onChange: PaginationProps["onChange"] = (value: number) => {
    //     if (page !== value) {
    //         setProductsPage(value);
    //     }
    // };
    // console.log("PageList: ", page);
    return (
        <div id="page-list">
            <Pagination
                current={page}
                onChange={handlePageChange}
                total={total}
                showLessItems={true}
                pageSize={1}
            />
        </div>
    );
};
