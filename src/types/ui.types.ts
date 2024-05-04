import { PathValue, Path } from "react-hook-form";

export interface IMenuItem {
    link: string;
    title: string;
    icon?: React.ReactNode;
    highlighted?: boolean;
    onClick?: () => void;
}

export interface IImageFile {
    file: File;
    src: string;
}

export interface ISelectOption<T> {
    value: PathValue<T, Path<T>>;
    label: string;
}

export interface IMenuLink {
    icon?: string;
    title: string;
    highlighted?: boolean;
    onClick?: () => void;
}

export enum SaleStatisticsOption {
    ByMonth = "byMonth",
    ByYear = "byYear",
}

export type SaleStatisticsData = [month: string, amount: number, color?: string][];
export type SaleStatisticsByCategoriesData = [month: string, amount: number, color?: string][];
