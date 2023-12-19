import * as yup from "yup";

export const productFormSchema = yup.object({
    name: yup.string().required(),
    brand: yup.string().required(),
    categories: yup.array().of(yup.string().required()),
    price: yup.number().required(),
    unit: yup.string().required(),
    sku: yup.string(),
    quantity: yup.number().required().integer().min(0),
    description: yup.string(),
    images: yup.array().of(yup.object({
        src: yup.string().required(),
        name: yup.string().required(),
    })),
}).required();

export type IProductFormValues = yup.InferType<typeof productFormSchema>;
