import { IGetSalesResponse } from "../models/responses/sales.response";
import { setSales, setSalesTotal, setSalesPage, setSalesPerPage } from "../store/slices/sale.slice";
import { store } from "../store/store";

export class SaleController {
    public handleGetSales(data: IGetSalesResponse): void {
        store.dispatch(setSales(data.sales));
        store.dispatch(setSalesTotal(data.total));
        store.dispatch(setSalesPage(data.page + 1));
    }

    public handlePageChange(value: number): void {
        store.dispatch(setSalesPage(value));
    }

    public handlePerPageChange(value: number): void {
        store.dispatch(setSalesPerPage(value));
    }
}
