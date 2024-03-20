import { IImage } from "./image.interface";

export interface ISaleProduct {
    id: string;
    name: string;
    image: IImage | null;
    quantity: number;
    price: number;
    total: number;
}
