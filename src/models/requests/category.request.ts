export interface IGetCategoryPayload {
    id: string;
}

export type IAddCategoryPayload = FormData;

export interface IEditCategoryPayload {
    id: string;
    category: FormData;
}

export type IDeleteCategoryPayload = {
    categories: string[];
};
