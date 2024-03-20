import { useState } from "react";
import { WithLocalFilterValuesProps } from "../types/props";
import { TableFilter } from "../types/filters";

export function withLocalFilterValues<F extends string, T extends Partial<WithLocalFilterValuesProps<F>> = Partial<WithLocalFilterValuesProps<F>>>(
    WrappedComponent: React.FC<Omit<T, keyof WithLocalFilterValuesProps<F>>>,
): React.FC<T> {
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";

    function ComponentWithLocalFilterValues(props: T) {
        const [localTableFilter, setLocalTableFilter] = useState<TableFilter<F>>({} as TableFilter<F>);
        const changeLocalTableFilter = (key: F, value: string | null) => {
            setLocalTableFilter((prev) => {
                return { ...prev, [key]: value } as TableFilter<F>;
            });
        };
        const handleFilterDropdownOpenChange = (key: F) => {
            if (!props.filter) { return; }
            const filterValue = props.filter[key];
            setLocalTableFilter((prev) => {
                return { ...prev, [key]: filterValue } as TableFilter<F>;
            });
        };
        return (
            <WrappedComponent
                {...props}
                localTableFilter={localTableFilter}
                changeLocalTableFilter={changeLocalTableFilter}
                handleFilterDropdownOpenChange={handleFilterDropdownOpenChange}
            />
        );
    }

    ComponentWithLocalFilterValues.displayName = `withLocalFilterValues(${displayName})`;

    return ComponentWithLocalFilterValues;
}
