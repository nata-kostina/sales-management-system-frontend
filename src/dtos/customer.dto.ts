import { ICustomerFormValues } from "../schemas/customer.form.schema";

export class CustomerDto {
    public formData: FormData;
    public constructor(data: ICustomerFormValues) {
        this.formData = new FormData();
        this.formData.append("name", data.name);
        this.formData.append("email", data.email);
        this.formData.append("phone", data.phone);
        this.formData.append("country", JSON.stringify(data.country));
        this.formData.append("state", JSON.stringify(data.state));
        this.formData.append("city", JSON.stringify(data.city));
        this.formData.append("address", data.address);
    }
}
