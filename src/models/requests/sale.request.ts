export interface IGetSalePayload {
    id: string;
}

export type IAddSalePayload = FormData;

export interface IEditSalePayload {
    id: string;
    sale: FormData;
}

export type IDeleteSalePayload = {
    sales: string[];
};
