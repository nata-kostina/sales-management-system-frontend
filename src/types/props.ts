import { TableFilter, TableFilterValue } from "./filters";

export interface WithLocalFilterValuesProps<F extends string> {
    filter: TableFilter<F>;
    localTableFilter: TableFilter<F>;
    changeLocalTableFilter: (key: F, value: TableFilterValue | TableFilterValue[] | null) => void;
    handleFilterDropdownOpenChange: (key: F) => void;
}
