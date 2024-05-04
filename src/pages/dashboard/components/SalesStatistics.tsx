import { Empty } from "antd";
import { FC, useEffect, useState, useCallback } from "react";
import { Chart } from "react-google-charts";
import { useFetch } from "../../../hooks/shared/useFetch";
import { IGetSalesStatisticsResponse } from "../../../models/responses/statistics.response";
import { appService } from "../../../services";
import { SaleStatisticsData, SaleStatisticsOption } from "../../../types/ui.types";
import { LocalPreloader } from "../../../components/ui/Preloader/LocalPreloader";
import { colorBlue } from "../../../utils/helper";
import { StatisticsOptions } from "./StatisticsOptions";

export const SalesStatistics: FC = () => {
    const { makeRequest, isLoading } = useFetch<IGetSalesStatisticsResponse>(true);
    const [data, setData] = useState<SaleStatisticsData>([]);
    const [yearOptions, setYearOptions] = useState<{ value: number; label: number; }[]>();
    const [viewBy, setViewBy] = useState<SaleStatisticsOption>(SaleStatisticsOption.ByMonth);
    const [year, setYear] = useState<number | null>(null);

    const fetchData = useCallback(async (option: SaleStatisticsOption, yearOption: number | null) => {
        try {
            const response = await makeRequest(() => appService.statistics.getSalesStatistics({ option, year: yearOption }));
            setData(response.data);
            if (response.minDate && response.maxDate) {
                const minYear = new Date(response.minDate).getFullYear();
                const maxYear = new Date(response.maxDate).getFullYear();
                const options: { value: number; label: number; }[] = [];
                for (let i = minYear; i <= maxYear; i++) {
                    options.push({ value: i, label: i });
                }
                setYearOptions(options);
            }
            return response;
        } catch (error) {
            console.error("Error while fetching sale statistics: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData(viewBy, null)
            .then((response) => {
                if (response?.maxDate) {
                    const maxYear = new Date(response.maxDate).getFullYear();
                    setYear(maxYear);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleViewChange = (value: SaleStatisticsOption) => {
        setViewBy(value);
        fetchData(value, year);
    };

    const handleYearChange = (yearValue: number) => {
        setYear(yearValue);
        fetchData(viewBy, yearValue);
    };

    return (
        <div className="card sales-statistics">
            <div className="card__header">
                <h3 className="statistics__title">Sales Analytics</h3>
                <StatisticsOptions
                    yearOptions={yearOptions}
                    handleViewChange={handleViewChange}
                    handleYearChange={handleYearChange}
                    viewBy={viewBy}
                    year={year}
                />
            </div>
            <div className="card__body">
                {isLoading ? <LocalPreloader /> : data.length > 0 ? (
                    <Chart
                        className="statistics__chart"
                        width="100%"
                        height="100%"
                        chartType="LineChart"
                        loader={<LocalPreloader />}
                        data={[["Month", "Amount"], ...data]}
                        options={{
                            chart: {
                                title: "Sales Analytics",
                            },
                            legend: "none",
                            colors: [colorBlue],
                            animation: {
                                startup: true,
                                easing: "linear",
                                duration: 500,
                            },
                        }}
                        rootProps={{ "data-testid": "1" }}
                    />
                ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>
        </div>
    );
};
