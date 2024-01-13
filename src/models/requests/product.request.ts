export interface IGetProductPayload {
    id: string;
}

export type IAddProductPayload = FormData;

export interface IEditProductPayload {
    id: string;
    product: FormData;
}

export type IDeleteProductPayload = {
    products: string[];
};
