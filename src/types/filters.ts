import { ICategory } from "../models/entities/category.interface";
import { ICustomer } from "../models/entities/customer.interface";
import { IProduct } from "../models/entities/product.interface";
import { ISale } from "../models/entities/sale.interface";

export type TableFilterValue = { label: string; value: string; };

export type TableFilter<F extends string> = Record<F, TableFilterValue | TableFilterValue[] | null>;

export type SaleFilter = keyof Pick<ISale, "customer" | "date" | "payment" | "reference" | "status"> | "email";
export type ProductFilter = keyof Pick<IProduct, "name" | "brand" | "categories" | "sku" | "unit">;
export type CategoryFilter = keyof Pick<ICategory, "name">;
export type CustomerFilter = keyof Pick<ICustomer, "name" | "email" | "phone" | "country" | "city">;
