import { IProductFormValues } from "../schemas/product.form.schema";

export class ProductDto {
    public formData: FormData;
    public constructor(data: IProductFormValues) {
        this.formData = new FormData();
        this.formData.append("name", data.name);
        if (data.sku) {
            this.formData.append("sku", data.sku);
        }
        if (data.unit) {
            this.formData.append("unit", data.unit);
        }
        if (data.brand) {
            this.formData.append("brand", data.brand);
        }
        if (data.description) {
            this.formData.append("description", data.description);
        }
        if (data.categories) {
            this.formData.append("categories", JSON.stringify(data.categories) ?? "[]");
        }
        if (data.images) {
            if (data.images.length === 0) {
                this.formData.append("images", "[]");
            } else {
                for (let i = 0; i < data.images.length; i++) {
                    this.formData.append("images", (data.images as File[])[i]);
                }
            }
        }
        this.formData.append("price", data.price.toString());
        this.formData.append("quantity", data.quantity.toString());
    }
}
