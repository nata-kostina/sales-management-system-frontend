import { Empty, Select } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { SaleStatisticsData } from "../../../types/ui.types";
import { IGetSalesStatisticsByCountriesResponse } from "../../../models/responses/statistics.response";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { LocalPreloader } from "../../../components/ui/Preloader/LocalPreloader";

export const GeoStatistics: FC = () => {
    const { makeRequest, isLoading } = useFetch<IGetSalesStatisticsByCountriesResponse>(true);
    const [data, setData] = useState<SaleStatisticsData>([]);
    const [yearOptions, setYearOptions] = useState<{ value: string; label: string; }[]>([{ label: "All", value: "All" }]);
    const [year, setYear] = useState<string | null>("All");

    const fetchData = useCallback(async (yearOption: number | null) => {
        try {
            const response = await makeRequest(() => appService.statistics.getSalesStatisticsByCountries({ year: yearOption }));
            setData(response.data);
            if (response.minDate && response.maxDate) {
                const minYear = new Date(response.minDate).getFullYear();
                const maxYear = new Date(response.maxDate).getFullYear();
                const options: { value: string; label: string; }[] = [];
                for (let i = minYear; i <= maxYear; i++) {
                    options.push({ value: i.toString(), label: i.toString() });
                }
                setYearOptions([{ label: "All", value: "All" }, ...options]);
            }
            return response;
        } catch (error) {
            console.error("Error while fetching sale statistics by countries: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleYearChange = (yearValue: string) => {
        setYear(yearValue);
        fetchData(yearValue === "All" ? null : +yearValue);
    };

    return (
        <div className="card geo-statistics">
            <div className="card__header">
                <h3 className="statistics__title">Sales By Countries</h3>
                <div className="statistics__option">
                    <Select
                        className="statistics__select statistics__select-year"
                        value={year}
                        placeholder="Choose year"
                        onChange={handleYearChange}
                        options={yearOptions}
                    />
                </div>
            </div>
            <div className="card__body">
                {isLoading ? <LocalPreloader /> : data.length > 0 ? (
                    <Chart
                        chartType="GeoChart"
                        width="100%"
                        height="100%"
                        data={[["Country", "Sales"], ...data]}
                        options={{
                            colors: ["#fffdec", "#ffe99a", "#ffd232"],
                        }}
                    />
                ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>
        </div>
    );
};
