import { IPayment } from "../entities/payment.interface";

export interface IGetPaymentResponse {
    payment: IPayment[];
}
