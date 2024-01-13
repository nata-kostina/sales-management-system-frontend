import { SorterResult } from "antd/es/table/interface";
import { IProduct } from "../models/product.interface";

export type FetchProducts = (productsPage?: number,
    productsPerPage?: number,
    sorter?: SorterResult<IProduct>,
    filter?: Record<string, string>) => Promise<void>;
