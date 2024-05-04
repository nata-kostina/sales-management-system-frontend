export interface IGetItemsResponse<T extends object> {
    items: T[];
    page: number;
    total: number;
}
