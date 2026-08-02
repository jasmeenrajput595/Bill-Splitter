import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be less than 30 characters")
    .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "One uppercase letter required")
    .matches(/[a-z]/, "One lowercase letter required")
    .matches(/[0-9]/, "One number required")
    .matches(/[!@#$%^&*]/, "One special character required"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email"),

  password: yup
    .string()
    .required("Password is required"),
});

