import { AuthService } from "./auth.service";
import { BrandService } from "./brand.service";
import { CategoryService } from "./category.service";
import { ProductService } from "./product.service";
import { UnitService } from "./unit.service";

export const appService = {
    auth: new AuthService("/api/auth"),
    products: new ProductService("/api/products"),
    brands: new BrandService("/api/brands"),
    units: new UnitService("/api/units"),
    categories: new CategoryService("/api/categories"),
};
