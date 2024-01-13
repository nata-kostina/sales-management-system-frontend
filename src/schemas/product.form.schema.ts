import * as yup from "yup";

export const productFormSchema = yup.object({
    name: yup.string().required(),
    brand: yup.string(),
    categories: yup.array().of(yup.string().required()),
    price: yup.number().required(),
    unit: yup.string(),
    sku: yup.string(),
    quantity: yup.number().required().integer().min(0),
    description: yup.string(),
    images: yup.array().of(yup.mixed()),
}).required();

export type IProductFormValues = yup.InferType<typeof productFormSchema>;
