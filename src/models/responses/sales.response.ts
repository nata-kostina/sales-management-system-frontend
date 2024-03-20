import { IPayment } from "../entities/payment.interface";
import { ISale } from "../entities/sale.interface";
import { ISaleStatus } from "../entities/saleStatus.interface";

export interface IGetSalesResponse {
    sales: ISale[];
    page: number;
    total: number;
}

export type IAddSaleResponse = {
    sale: ISale;
};

export type IDeleteSaleResponse = void;

export interface IGetSaleResponse {
    sale: ISale;
}

export type IEditSaleResponse = IGetSaleResponse;

export interface IGetSaleFormOptionsResponse {
    statuses: ISaleStatus[];
    payment: IPayment[];
}
