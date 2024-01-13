import { ICategoryFormValues } from "../schemas/category.form.schema";

export class CategoryDto {
    public formData: FormData;
    public constructor(data: ICategoryFormValues) {
        this.formData = new FormData();
        this.formData.append("name", data.name);
        if (data.shortDescription) {
            this.formData.append("shortDescription", data.shortDescription);
        }
        if (data.longDescription) {
            this.formData.append("longDescription", data.longDescription);
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
    }
}
