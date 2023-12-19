import { IProductDto } from "../../dtos/product/product.dto.interface";

export interface IEditProductPayload {
    id: string;
    payload: IProductDto;
}
