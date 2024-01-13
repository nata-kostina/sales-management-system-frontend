/* eslint-disable @typescript-eslint/prefer-for-of */
import vars from "../styles/_vars.module.scss";

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
