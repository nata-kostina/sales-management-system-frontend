import * as yup from "yup";

export const customerFormSchema = yup.object({
    name: yup.string().required("Enter a name"),
    email: yup.string().email("Enter an e-mail").required(),
    phone: yup.string().required("Enter a phone"),
    country: yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
    }).required("Choose a country"),
    state: yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
    }).required("Choose a state"),
    city: yup.object({
        id: yup.number().required(),
        name: yup.string().required(),
    }).required("Choose a city"),
    address: yup.string().required("Enter an address"),
}).required();

export type ICustomerFormValues = yup.InferType<typeof customerFormSchema>;
