export interface IGetCustomerPayload {
    id: string;
}

export type IAddCustomerPayload = FormData;

export interface IEditCustomerPayload {
    id: string;
    customer: FormData;
}

export type IDeleteCustomerPayload = {
    customers: string[];
};
