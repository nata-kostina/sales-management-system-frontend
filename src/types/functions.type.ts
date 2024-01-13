import { SorterResult } from "antd/es/table/interface";

export type FetchItems<T extends object> = (page?: number,
    perPage?: number,
    sorter?: SorterResult<T>,
    filter?: Record<string, string>) => Promise<void>;
