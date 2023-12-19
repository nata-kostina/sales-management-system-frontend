import { AuthService } from "./auth.service";
import { BrandService } from "./brand.service";
import { ProductService } from "./product.service";
import { UnitService } from "./unit.service";

export const appService = {
    auth: new AuthService("/auth"),
    products: new ProductService("/products"),
    brands: new BrandService("/brands"),
    units: new UnitService("/units"),
};
