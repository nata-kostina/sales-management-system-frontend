import * as yup from "yup";

export const loginFormSchema = yup.object({
    email: yup.string().email("Invalid e-mail").required("Enter e-mail"),
    password: yup.string().required("Enter password"),
}).required();

export type ILoginFormValues = yup.InferType<typeof loginFormSchema>;
