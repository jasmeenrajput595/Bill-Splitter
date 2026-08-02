import * as yup from "yup";

export const expenseSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required"),

  description: yup
    .string()
    .trim()
    .required("Description is required"),

  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
});