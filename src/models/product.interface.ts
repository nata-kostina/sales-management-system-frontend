import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";
import { IImage } from "./image.interface";
import { IUnit } from "./unit.interface";

export interface IProduct {
    id: string;
    name: string;
    sku: string;
    brand: IBrand | null;
    price: number;
    quantity: number;
    images: IImage[];
    unit: IUnit | null;
    description: string;
    categories: ICategory[] | null;
}
