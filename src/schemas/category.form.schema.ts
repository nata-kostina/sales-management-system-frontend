import * as yup from "yup";

export const categoryFormSchema = yup.object({
    name: yup.string().required("Enter a name"),
    shortDescription: yup.string(),
    longDescription: yup.string(),
    images: yup.array().of(yup.mixed()),
}).required();

export type ICategoryFormValues = yup.InferType<typeof categoryFormSchema>;
