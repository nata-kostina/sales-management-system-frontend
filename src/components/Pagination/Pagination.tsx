import { FC } from "react";
import { PerPage } from "./PerPage";
import { PageList } from "./PageList";

interface Props {
    totalItemsNum: number;
    page: number;
    perPage: number;
    handlePageChange: (page: number) => Promise<void>;
    handlePerPageChange: (value: number) => Promise<void>;
}

export const Pagination: FC<Props> = ({ handlePerPageChange, perPage, ...rest }) => {
    return (
        <div id="pagination" className="pagination">
            <div className="pagination__inner">
                <PerPage perPage={perPage} handlePerPageChange={handlePerPageChange} />
                <PageList perPage={perPage} {...rest} />
            </div>
        </div>
    );
};
