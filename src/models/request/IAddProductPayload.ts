import { IProductDto } from "../../dtos/product/product.dto.interface";

export interface IAddProductPayload {
    product: Omit<IProductDto, "id">;
}
