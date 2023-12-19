import { IImage } from "./image.interface";

export interface ICategory {
    id: string;
    name: string;
    image: IImage[];
    description: string;
}
