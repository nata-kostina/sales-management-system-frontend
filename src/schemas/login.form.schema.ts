import * as yup from "yup";

export const loginFormSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
}).required();

export type ILoginFormValues = yup.InferType<typeof loginFormSchema>;
