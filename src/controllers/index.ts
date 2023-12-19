import { AuthController } from "./auth.controller";
import { ProductController } from "./product.controller";

export const appController = {
    auth: new AuthController(),
    products: new ProductController(),
};
