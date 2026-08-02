import * as yup from "yup";

export const groupSchema = yup.object({
  groupName: yup
    .string()
    .trim()
    .required("Group name is required")
    .min(3, "Group name must be at least 3 characters")
    .max(30, "Group name must be less than 30 characters"),
});