import { IImage } from "./image.interface";

export interface ICategory {
    id: string;
    name: string;
    images: IImage[];
    shortDescription: string | null;
    longDescription: string | null;
}
