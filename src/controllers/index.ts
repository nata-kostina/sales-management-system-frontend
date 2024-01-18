import { AuthController } from "./auth.controller";
import { CategoryController } from "./category.controller";
import { CustomerController } from "./customer.controller";
import { ProductController } from "./product.controller";

export const appController = {
    auth: new AuthController(),
    product: new ProductController(),
    category: new CategoryController(),
    customer: new CustomerController(),
};
