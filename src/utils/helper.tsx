/* eslint-disable @typescript-eslint/prefer-for-of */
import dayjs from "dayjs";
import { ISaleProduct } from "../models/entities/saleProduct.interface";
import vars from "../styles/_vars.module.scss";
import { TableFilter } from "../types/filters";

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
