import { Select } from "antd";
import { FC } from "react";

interface Props {
    perPage: number;
    handlePerPageChange: (value: number) => Promise<void>;
}

export const PerPage: FC<Props> = ({ handlePerPageChange, perPage }) => {
    return (
        <div id="per-page" className="per-page">
            <div className="per-page__inner">
                <div className="per-page__title">Show per page:</div>
                <div className="per-page__dropdown">
                    <Select
                        value={perPage}
                        style={{ width: 80 }}
                        onChange={handlePerPageChange}
                        options={[
                            { value: 1, label: "1" },
                            { value: 2, label: "2" },
                            { value: 10, label: "10" },
                            { value: 25, label: "25" },
                            { value: 50, label: "50" },
                            { value: 100, label: "100" },
                        ]}
                        optionFilterProp="label"
                    />
                </div>
            </div>
        </div>
    );
};
