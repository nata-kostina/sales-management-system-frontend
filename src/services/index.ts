import { AuthService } from "./auth.service";
import { BrandService } from "./brand.service";
import { CategoryService } from "./category.service";
import { CustomerService } from "./customer.service";
import { PaymentService } from "./payment.service";
import { ProductService } from "./product.service";
import { SaleService } from "./sale.service";
import { StatisticsService } from "./statistics.service";
import { SaleStatusService } from "./status.service";
import { UnitService } from "./unit.service";

export const appService = {
    auth: new AuthService("/api/auth"),
    product: new ProductService("/api/products"),
    brand: new BrandService("/api/brands"),
    unit: new UnitService("/api/units"),
    category: new CategoryService("/api/categories"),
    customer: new CustomerService("/api/customers"),
    sale: new SaleService("/api/sales"),
    status: new SaleStatusService("/api/statuses"),
    payment: new PaymentService("/api/payment"),
    statistics: new StatisticsService("/api/statistics"),
};
