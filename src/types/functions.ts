import { SorterResult } from "antd/es/table/interface";
import { TableFilter } from "./filters";

export type FetchItems<T extends object, F extends string> = (page?: number,
    perPage?: number,
    sorter?: SorterResult<T>,
    filter?: TableFilter<F>) => Promise<void>;
