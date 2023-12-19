import { IImage } from "../../models/image.interface";

export interface IProductDto {
    name: string;
    sku: string | null;
    brand: string | null;
    price: number;
    quantity: number;
    images: IImage[];
    unit: string | null;
    description: string;
    categories: string[];
}
