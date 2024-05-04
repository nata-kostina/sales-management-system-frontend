import { Empty } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { SaleStatisticsData, SaleStatisticsOption } from "../../../types/ui.types";
import { IGetSalesStatisticsByCategoriesResponse } from "../../../models/responses/statistics.response";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { LocalPreloader } from "../../../components/ui/Preloader/LocalPreloader";
import { statisticsColorsArr } from "../../../utils/helper";
import { StatisticsOptions } from "./StatisticsOptions";

export const CategoryStatistics: FC = () => {
    const { makeRequest, isLoading } = useFetch<IGetSalesStatisticsByCategoriesResponse>(true);
    const [data, setData] = useState<SaleStatisticsData>([]);
    const [yearOptions, setYearOptions] = useState<{ value: number; label: number; }[]>();
    const [viewBy, setViewBy] = useState<SaleStatisticsOption>(SaleStatisticsOption.ByMonth);
    const [year, setYear] = useState<number | null>(null);

    const fetchData = useCallback(async (option: SaleStatisticsOption, yearOption: number | null) => {
        try {
            console.log({ option: viewBy, year: yearOption });
            const response = await makeRequest(() => appService.statistics.getSalesStatisticsByCategories({ option, year: yearOption }));
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
        <div className="card categories-statistics">
            <div className="card__header">
                <h3 className="statistics__title">Sales By Categories</h3>
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
                        chartType="ColumnChart"
                        width="100%"
                        height="100%"
                        data={data}
                        options={{
                            colors: statisticsColorsArr,
                            animation: {
                                startup: true,
                                easing: "linear",
                                duration: 500,
                            },
                            legend: { position: "bottom" },
                        }}
                    />
                ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>
        </div>
    );
};
