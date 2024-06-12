import { ISaleFormValues } from "../schemas/sale.form.schema";

export class SaleDto {
    public formData: FormData;
    public constructor(data: ISaleFormValues) {
        this.formData = new FormData();
        this.formData.append("customer", data.customer);
        this.formData.append("date", data.date.valueOf().toString());
        this.formData.append("payment", data.payment);
        this.formData.append("status", data.status);
        this.formData.append("total", data.total.toString());
        this.formData.append("paid", data.paid.toString());
        if (data.products.length === 0) {
            this.formData.append("products", "[]");
        } else {
            this.formData.append("products", JSON.stringify(data.products.map(({ id, quantity, price, total }) => ({
                id, quantity, price, total,
            }))));
        }
    }
}
