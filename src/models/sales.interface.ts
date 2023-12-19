export enum ISalesStatus {
    Paid = "Paid",
    Unpaid = "Unpaid",
    Refunded = "Refunded",
    Canceled = "Canceled",
}

export interface ISales {
    id: string;
    date: string;
    status: ISalesStatus;
    total: number;
    paid: number;
    customer: {
        id: string;
        name: string;
    };
}
