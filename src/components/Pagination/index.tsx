import { FC } from "react";
import { PerPage } from "./PerPage";
import { PageList } from "./PageList";

interface Props {
    total: number;
    page: number;
    handlePageChange: (page: number) => Promise<void>;
    handlePerPageChange: (value: number) => Promise<void>;
}

export const Pagination: FC<Props> = ({ handlePerPageChange, ...rest }) => {
    // console.log("Pagination: ", rest.page);
    return (
        <div className="pagination">
            <div className="pagination__inner">
                <PerPage handlePerPageChange={handlePerPageChange} />
                <PageList {...rest} />
            </div>
        </div>
    );
};
