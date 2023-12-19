import { IProductDto } from "./product.dto.interface";

// export class ProductDto implements IProductDto {
//     public id: string;
//     public name: string;
//     public brand: IBrandDto | null;
//     public unit: IUnitDto | null;
//     public sku: string;
//     public price: number;
//     public quantity: number;
//     public images: IImage[];
//     public categories: ICategoryDto[] | null;
//     public description: string;

//     public constructor(
//         data: Omit<IProduct & { _id: Types.ObjectId; }, "brand" | "unit" | "categories"> & PopulatedProduct,
//     ) {
//         this.id = model._id.toString();
//         this.name = model.name;
//         this.brand = {
//             id: model.brand._id.toString(),
//             name: model.brand.name,
//         };
//         this.price = model.price;
//         this.images = model.images;
//         this.quantity = model.quantity;
//         this.sku = model.sku;
//         this.unit = {
//             id: model.unit._id.toString(),
//             name: model.unit.name,
//         };
//         this.description = model.description;
//         this.categories = model.categories.map(({ _id, description, image, name }) => ({
//             id: _id.toString(),
//             name,
//             description,
//             image,
//         }));
//     }
// }
