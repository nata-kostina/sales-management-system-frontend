import { FC } from "react";
import { SalesStatistics } from "./components/SalesStatistics";
import { Section } from "../../components/Section/Section";
import { GeoStatistics } from "./components/GeoStatistics";
import { CategoryStatistics } from "./components/CategoryStatistics";
import { BestSellers } from "./components/BestSellers";
import { SalesGeneralStatistics } from "./components/SalesGeneralStatistics";

export const DashboardPage: FC = () => {
    return (
        <Section name="section-statistics">
            <SalesGeneralStatistics />
            <SalesStatistics />
            <GeoStatistics />
            <CategoryStatistics />
            <BestSellers />
        </Section>
    );
};
