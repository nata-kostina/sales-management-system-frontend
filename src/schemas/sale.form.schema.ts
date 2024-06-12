import * as yup from "yup";
import dayjs from "dayjs";

export const saleFormSchema = yup.object({
    customer: yup.string().required("Select customer"),
    date: yup
        .mixed()
        .test("is-dayjs", "Select date", isDayjs)
        .required("Select date"),
    products: yup.array().of(yup.object({
        id: yup.string().required(),
        name: yup.string().required(),
        image: yup.mixed().nullable(),
        quantity: yup.number().required(),
        price: yup.number().required(),
        total: yup.number().required(),
    })).min(1, "Select products").required("Select products"),
    status: yup.string().required("Select sale status"),
    payment: yup.string().required("Select payment status"),
    total: yup.number().moreThan(0).required(),
    paid: yup.number().required("Enter paid amount"),
}).required();

export type ISaleFormValues = yup.InferType<typeof saleFormSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDayjs(value: any) {
    return dayjs(value).isValid();
}
