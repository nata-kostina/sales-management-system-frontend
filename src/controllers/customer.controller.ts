import { IGetCustomersResponse } from "../models/responses/customer.response";
import { setCustomers, setCustomersPage, setCustomersTotal } from "../store/slices/customer.slice";
import { store } from "../store/store";

export class CustomerController {
    public handleGetCustomers(data: IGetCustomersResponse): void {
        store.dispatch(setCustomers(data.customers));
        store.dispatch(setCustomersTotal(data.total));
        store.dispatch(setCustomersPage(data.page + 1));
    }
}
