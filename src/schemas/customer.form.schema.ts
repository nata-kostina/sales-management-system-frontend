import * as yup from "yup";

export const customerFormSchema = yup.object({
    name: yup.string().required("Enter name"),
    email: yup.string().email("Invalid format").required("Enter e-mail"),
    phone: yup.string().required("Enter phone"),
    country: yup.object({
        id: yup.number().required("Choose country"),
        name: yup.string().required("Choose country"),
    }).required("Choose country"),
    state: yup.object({
        id: yup.number().required("Choose state"),
        name: yup.string().required("Choose state"),
    }).required("Choose state"),
    city: yup.object({
        id: yup.number().required("Choose city"),
        name: yup.string().required("Choose city"),
    }).required("Choose city"),
    address: yup.string().required("Enter address"),
}).required();

export type ICustomerFormValues = yup.InferType<typeof customerFormSchema>;
