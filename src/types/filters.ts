import { ISale } from "../models/entities/sale.interface";

export type TableFilterValue = { label: string; value: string; };

export type TableFilter<F extends string> = Record<F, TableFilterValue | TableFilterValue[] | null>;

export type SaleFilter = keyof Pick<ISale, "customer" | "date" | "payment" | "reference" | "status"> | "email";
