import { FC, useEffect, useState } from "react";
import { IGetGeneralSalesStatisticResponse } from "../../../models/responses/statistics.response";
import { LocalPreloader } from "../../../components/ui/Preloader/LocalPreloader";
import { useFetch } from "../../../hooks/shared/useFetch";
import { appService } from "../../../services";
import { assets } from "../../../utils/assetsManager";
import { IncreaseSvg } from "../../../components/vectors/statistics/IncreaseSvg";
import { DecreaseSvg } from "../../../components/vectors/statistics/DecreaseSvg";
import { SvgBg } from "../../../components/vectors/statistics/SvgBg";

export const SalesGeneralStatistics: FC = () => {
    const { makeRequest, isLoading } = useFetch<IGetGeneralSalesStatisticResponse>(true);
    const [data, setData] = useState<IGetGeneralSalesStatisticResponse>({
        total: 0,
        monthly: {
            amount: 0,
            change: 0,
        },
        weekly: {
            amount: 0,
            change: 0,
        },
    });

    useEffect(() => {
        const fetchGeneralStatistics = async () => {
            try {
                const response = await makeRequest(() => appService.statistics.getGeneralStatistics());
                setData(response);
            } catch (error) {
                console.error("Error while fetching general statistics");
            }
        };
        fetchGeneralStatistics();
    }, []);
    return (
        <div className="general-statistics">
            <StatisticsCard isLoading={isLoading} title="total sales" image={assets.statistics.bag} amount={data.total} />
            <StatisticsCard isLoading={isLoading} title="weekly earning" image={assets.statistics.dollar} amount={data.weekly.amount} change={data.weekly.change} />
            <StatisticsCard isLoading={isLoading} title="monthly earning" image={assets.statistics.dollar} amount={data.monthly.amount} change={data.monthly.change} />
        </div>
    );
};

interface StatisticsCardProps {
    isLoading: boolean;
    image: string;
    title: string;
    amount: number;
    change?: number;
}

export const StatisticsCard: FC<StatisticsCardProps> = ({ title, image, amount, change, isLoading }) => {
    const changeState = getChangeState(change);
    return (
        <div className={`card statistics__item item-state-${changeState}`}>
            <div className="item__inner">
                {isLoading ? <LocalPreloader /> : (
                    <>
                        <div className="item__top">
                            <div className="item__img-box">
                                <SvgBg />
                                <img src={image} alt="" className="item__img" />
                            </div>
                            <div className="item__content">
                                <h3 className="item__title">{title}</h3>
                                <h4 className="item__amount">&euro;{amount}</h4>
                                {change !== undefined && (
                                    <div className="change-box">
                                        <div className="change__img-box">
                                            {arrowMap[changeState]}
                                        </div>
                                        <div className="change__text">
                                            <span>{change}</span>
                                            <span>%</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="item__bottom">
                            <img src={imageMap[changeState]} alt="Wave" className="wave" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

type ChangeState = "none" | "increase" | "decrease" | "same";

const getChangeState = (change?: number): ChangeState => {
    return change === undefined ? "none" : change > 0 ? "increase" : change < 0 ? "decrease" : "same";
};

const imageMap: Record<ChangeState, string> = {
    none: assets.statistics.waveBlue,
    increase: assets.statistics.waveGreen,
    decrease: assets.statistics.waveRed,
    same: assets.statistics.waveGray,
};

const arrowMap: Record<ChangeState, React.ReactNode> = {
    none: <IncreaseSvg />,
    increase: <IncreaseSvg />,
    decrease: <DecreaseSvg />,
    same: <DecreaseSvg />,
};
