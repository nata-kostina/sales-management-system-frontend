import { AxiosResponse } from "axios";
import { $api } from "../api";
import { IGetPaymentResponse } from "../models/responses/payment.response";

export class PaymentService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getPayment = this.getPayment.bind(this);
    }

    public async getPayment(): Promise<AxiosResponse<IGetPaymentResponse>> {
        return $api.get(`${this.baseUrl}/`);
    }
}
