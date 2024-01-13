import { IImage } from "../../models/image.interface";

export interface IProductDto {
    name: string;
    sku?: string;
    brand?: string;
    price: string;
    quantity: string;
    images: IImage[];
    unit?: string;
    description?: string;
    categories: string[];
}
