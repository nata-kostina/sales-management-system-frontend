/* eslint-disable @typescript-eslint/prefer-for-of */
import dayjs from "dayjs";
import { ISaleProduct } from "../models/entities/saleProduct.interface";
import vars from "../styles/_vars.module.scss";
import { TableFilter } from "../types/filters";
import { ISale } from "../models/entities/sale.interface";
import { IProduct } from "../models/entities/product.interface";
import { ICategory } from "../models/entities/category.interface";
import { ICustomer } from "../models/entities/customer.interface";

const { bpXl, bpL, bpM, bpMs, bpS } = vars;
export interface Breakpoints {
    readonly Xl: string;
    readonly L: string;
    readonly M: string;
    readonly Ms: string;
    readonly S: string;
}
export const breakpoints: Breakpoints = {
    Xl: bpXl,
    L: bpL,
    M: bpM,
    Ms: bpMs,
    S: bpS,
};

const bps = Object.values(breakpoints).map((item) => Number.parseInt(item.toString(), 10)).sort((a, b) => a - b).map((item) => `${item}px`);

export const getBreakpoint = (): string => {
    for (let i = 0; i < bps.length; i++) {
        const query = `(max-width: ${bps[i]})`;
        if (window.matchMedia(query).matches) {
            const key = bps[i];
            return key;
        }
    }
    return breakpoints.Xl;
};

export function isMatch(media: string): boolean {
    const query = `(max-width: ${media}px)`;
    return window.matchMedia(query).matches;
}

export const debounce = <T extends (...args: any[]) => any>(
    callback: T,
    waitFor: number,
): (...args: Parameters<T>) => ReturnType<T> => {
    let timeout = 0;
    return (...args: Parameters<T>): ReturnType<T> => {
        let result: any;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            result = callback(...args);
        }, waitFor);
        return result;
    };
};

export function logFormData(formData: FormData): void {
    for (const [field, value] of formData.entries()) {
        console.log(`${field}: ${value}`);
    }
}

export const currencyFormatter = (value: number): string => {
    return `${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const currencyParser = (value: string): string => {
    return value.replace(/€\s?|(,*)/g, "");
};

export const getTotal = (products: ISaleProduct[]): number => {
    return products.reduce((sum, curr) => (curr.price * curr.quantity) + sum, 0);
};

export const formatDateFromString = (value: string, format = "DD MMM YYYY"): string => {
    return dayjs(+value).format(format);
};

export const formatDateFromNumber = (value: number, format = "DD MMM YYYY"): string => {
    return dayjs(value).format(format);
};

export const removeNullableFilters = (filter?: Record<string, string | null>): Record<string, string> => {
    if (!filter) { return {}; }
    return Object.keys(filter).reduce((acc, curr) => {
        const value = filter[curr];
        if ((value !== null) && (value !== undefined)) {
            acc[curr] = value;
        }
        return acc;
    }, {} as Record<string, string>);
};

export function extractValuesFromFilter<F extends string>(filter?: TableFilter<F>): Record<string, string> {
    if (!filter) { return {}; }
    return Object.keys(filter).reduce((acc, curr) => {
        const item = filter[curr as keyof typeof filter];
        if (item) {
            if (Array.isArray(item)) {
                acc[curr] = item.map((i) => i.value).join(",");
            } else {
                acc[curr] = item.value;
            }
        }
        return acc;
    }, {} as Record<string, string>);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDisplayedValueFromItems(items: any, selected?: string | string[]): string[] {
    if (!selected) { return []; }
    const selectedValues = !Array.isArray(selected) ? [selected] : [...selected];
    if (selectedValues.length === 1) {
        if (isSaleArray(items)) {
            const value = items.find((s) => s.id === selectedValues[0]);
            return value ? [`#${value.reference}`] : [];
        }
        if (isCustomerArray(items)) {
            const value = items.find((s) => s.id === selectedValues[0]);
            return value ? [`${value.name}`] : [];
        }
        if (isProductArray(items)) {
            const value = items.find((s) => s.id === selectedValues[0]);
            return value ? [`${value.name}`] : [];
        }
        if (isCategoryArray(items)) {
            const value = items.find((s) => s.id === selectedValues[0]);
            return value ? [`${value.name}`] : [];
        }
    }
    return selectedValues;
}

export function isSaleArray(data: any[]): data is ISale[] {
    return (data[0] as ISale).reference !== undefined;
}

export function isCustomerArray(data: any[]): data is ICustomer[] {
    return (data[0] as ICustomer).email !== undefined;
}

export function isProductArray(data: any[]): data is IProduct[] {
    return (data[0] as IProduct).sku !== undefined;
}

export function isCategoryArray(data: any[]): data is ICategory[] {
    return (data[0] as ICategory).shortDescription !== undefined;
}

export const downloadFile = (blob: Blob, fileName: string | null): void => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName ?? "data.csv");
    document.body.appendChild(link);
    link.click();
};

export const getFilenameFromHeader = (header: string | null): string | null => {
    try {
        if (!header) { return null; }
        const fileName = header.toString().split("filename=")[1].slice(1, -1);
        return fileName;
    } catch (error) {
        return null;
    }
};

export const { colorPurple, colorBlue, colorOrange, colorYellow, colorGreen, colorRed } = vars;
export const statisticsColorsArr = [colorPurple, colorBlue, colorOrange, colorYellow, colorGreen, colorRed];
