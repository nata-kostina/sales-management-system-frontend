import { Select } from "antd";
import { FC } from "react";
import { SaleStatisticsOption } from "../../../types/ui.types";

interface Props {
    viewBy: SaleStatisticsOption;
    year: number | null;
    yearOptions?: {
        value: number;
        label: number;
    }[];
    handleViewChange: (value: SaleStatisticsOption) => void;
    handleYearChange: (yearValue: number) => void;
}

export const StatisticsOptions: FC<Props> = ({ viewBy, year, yearOptions, handleViewChange, handleYearChange }) => {
    console.log({ year });
    console.log({ yearOptions });
    return (
        <div className="statistics__option">
            <Select
                className="statistics__select statistics__select-period"
                defaultValue={SaleStatisticsOption.ByMonth}
                onChange={handleViewChange}
                options={[
                    { value: SaleStatisticsOption.ByMonth, label: "By Month" },
                    { value: SaleStatisticsOption.ByYear, label: "By Year" },
                ]}
            />
            <Select
                className="statistics__select statistics__select-year"
                disabled={viewBy !== SaleStatisticsOption.ByMonth}
                value={year}
                placeholder="Choose year"
                onChange={handleYearChange}
                options={yearOptions}
            />
        </div>
    );
};
