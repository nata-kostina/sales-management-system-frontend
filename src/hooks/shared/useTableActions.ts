import { useState } from "react";
import { AxiosResponse } from "axios";
import { useModalOperationResult } from "./useModalOperationResult";
import { content } from "../../data/content";
import { Sections } from "../../types/entities";
import { getFilenameFromHeader, downloadFile, getDisplayedValueFromItems } from "../../utils/helper";

interface Props<T extends object> {
    items: T[];
    selectedRowKeys: string[];
    deleteItems: (items: string[]) => Promise<void>;
    fetchItems: () => Promise<void>;
    fetchCsv: (payload: string[]) => Promise<AxiosResponse<Blob, any>>;
    section: Sections;
}

export function useTableActions<T extends object>({
    items, selectedRowKeys, deleteItems,
    section, fetchItems, fetchCsv,
}: Props<T>): {
        isCsvLoading: boolean;
        handleActionDelete: () => void;
        handleActionCsv: () => void;
        handleDeleteItems: (value?: string | string[]) => Promise<void>;
    } {
    const { modalSuccess, modalError, modalSelectItems } = useModalOperationResult();
    const [isCsvLoading, setIsCsvLoading] = useState(false);

    /* Actions */
    const handleActionDelete = () => {
        if (items.length === 0) { return; }
        modalSelectItems(selectedRowKeys, handleDeleteItems, "Delete", "Are you sure you want to delete these items?");
    };
    const handleActionCsv = () => {
        if (items.length === 0) { return; }
        if (selectedRowKeys.length > 0) {
            modalSelectItems(selectedRowKeys, handleDownloadCsv, "Download", "Which items would you like to export?");
        } else {
            handleDownloadCsv();
        }
    };

    /* Operations */
    const handleDeleteItems = async (payload?: string | string[]) => {
        const value = getDisplayedValueFromItems(items, payload);
        try {
            await deleteItems((payload && Array.isArray(payload)) ? payload : []);
            await fetchItems();
            modalSuccess(content.operation.delete.success(section, value));
        } catch (error) {
            modalError(content.operation.delete.error(section, value));
        }
    };

    const handleDownloadCsv = async (items?: string | string[]) => {
        try {
            setIsCsvLoading(true);
            const payload = (items && Array.isArray(items)) ? items : [];
            const response = await fetchCsv(payload);
            const fileName = getFilenameFromHeader(response.headers["content-disposition"]);
            setIsCsvLoading(false);
            downloadFile(response.data, fileName);
        } catch (error) {
            setIsCsvLoading(false);
        }
    };
    return { handleActionCsv, handleActionDelete, isCsvLoading, handleDeleteItems };
}
