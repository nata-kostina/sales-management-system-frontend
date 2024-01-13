import { FC } from "react";
import { Pagination } from "antd";

interface Props {
    totalItemsNum: number;
    page: number;
    perPage: number;
    handlePageChange: (page: number) => void;
}

export const PageList: FC<Props> = ({ page, totalItemsNum, handlePageChange, perPage }) => {
    return (
        <div id="page-list">
            <Pagination
                current={page}
                onChange={handlePageChange}
                total={totalItemsNum}
                showLessItems={true}
                pageSize={perPage}
            />
        </div>
    );
};
