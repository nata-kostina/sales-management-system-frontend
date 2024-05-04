import { useCallback } from "react";
import { IDeleteSaleResponse } from "../../models/responses/sales.response";
import { appService } from "../../services";
import { useFetch } from "./useFetch";

interface Props {
    section: keyof Pick<typeof appService, "product" | "category" | "customer" | "sale">;
}

export const useDelete = ({ section }: Props): { deleteItems: (items?: string[]) => Promise<void>; isDeleteLoading: boolean; } => {
    const { isLoading: isDeleteLoading, makeRequest } = useFetch<IDeleteSaleResponse>(false);

    const deleteItems = useCallback(async (items?: string[]) => {
        await makeRequest(() => appService[section].delete({ items: items ?? [] }));
    }, [makeRequest]);

    return { deleteItems, isDeleteLoading };
};
