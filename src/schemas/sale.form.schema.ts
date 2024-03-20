import * as yup from "yup";
import dayjs from "dayjs";
import { ISale } from "../models/entities/sale.interface";

export const saleFormSchema = yup.object({
    customer: yup.string().required("Select a customer"),
    date: yup
        .mixed()
        .test("is-dayjs", "Select a date", isDayjs)
        .required("Select a date"),
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
    total: yup.number().required(),
    paid: yup.number().required(),
}).required();

export type ISaleFormValues = yup.InferType<typeof saleFormSchema>;

export const DefaultSaleFormValue: ISaleFormValues = {
    customer: "",
    date: "",
    payment: "",
    status: "",
    total: 0,
    products: [],
    paid: 0,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDayjs(value: any) {
    return dayjs(value).isValid();
}

export const getDefaultSaleValues = (sale: ISale | Omit<ISale, "id"> | null): ISaleFormValues => {
    if (!sale) { return DefaultSaleFormValue; }
    return ({
        customer: sale.customer.id,
        date: sale.date,
        payment: sale.payment.id,
        status: sale.status.id,
        total: sale.total,
        products: sale.products,
        paid: sale.paid,
    });
};
