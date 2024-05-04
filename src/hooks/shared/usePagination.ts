import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { appController } from "../../controllers";

interface Props {
    slice: keyof Pick<RootState, "product" | "category" | "customer" | "sale">;
    fetchItems: (page: number, perPage: number) => Promise<void>;
    onSelectChange: (newSelectedRowKeys: React.Key[]) => void;
}

export function usePagination({ fetchItems, slice, onSelectChange }: Props): {
    totalItemsNum: number;
    page: number;
    perPage: number;
    handlePageChange: (value: number) => Promise<void>;
    handlePerPageChange: (value: number) => Promise<void>;
} {
    const totalItemsNum = useAppSelector((state) => state[slice].total);
    const page = useAppSelector((state) => state[slice].page);
    const perPage = useAppSelector((state) => state[slice].perPage);
    const handlePageChange = async (value: number) => {
        await fetchItems(value, perPage);
        appController[slice].handlePageChange(value);
        onSelectChange([]);
    };
    const handlePerPageChange = async (value: number) => {
        await fetchItems(1, value);
        appController[slice].handlePerPageChange(value);
    };

    return {
        handlePageChange,
        handlePerPageChange,
        page,
        perPage,
        totalItemsNum,
    };
}
