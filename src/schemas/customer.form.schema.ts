import * as yup from "yup";

export const customerFormSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    country: yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
    }).required(),
    state: yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
    }).required(),
    city: yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
    }).required(),
    address: yup.string().required(),
}).required();

export type ICustomerFormValues = yup.InferType<typeof customerFormSchema>;
