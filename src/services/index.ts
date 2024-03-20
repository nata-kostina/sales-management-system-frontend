import { AuthService } from "./auth.service";
import { BrandService } from "./brand.service";
import { CategoryService } from "./category.service";
import { CustomerService } from "./customer.service";
import { PaymentService } from "./payment.service";
import { ProductService } from "./product.service";
import { SaleService } from "./sale.service";
import { SaleStatusService } from "./status.service";
import { UnitService } from "./unit.service";

export const appService = {
    auth: new AuthService("/api/auth"),
    products: new ProductService("/api/products"),
    brands: new BrandService("/api/brands"),
    units: new UnitService("/api/units"),
    categories: new CategoryService("/api/categories"),
    customers: new CustomerService("/api/customers"),
    sale: new SaleService("/api/sales"),
    statuses: new SaleStatusService("/api/statuses"),
    payment: new PaymentService("/api/payment"),
};
