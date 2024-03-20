import { ICustomer } from "./customer.interface";
import { IPayment } from "./payment.interface";
import { ISaleProduct } from "./saleProduct.interface";
import { ISaleStatus } from "./saleStatus.interface";

export interface ISale {
    id: string;
    reference: string;
    date: string;
    status: ISaleStatus;
    payment: IPayment;
    total: number;
    paid: number;
    customer: ICustomer;
    products: ISaleProduct[];
}
