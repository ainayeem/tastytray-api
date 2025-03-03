import { z } from "zod";

export const createMealProviderValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(26),
    mealProvider: z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      phone: z.string().min(11).max(11),
      address: z.string().min(2).max(100),
      cuisineSpecialties: z.array(z.string()).min(1),
      experience: z.string(),
    }),
  }),
});

export const createCustomerValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(26),
    customer: z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      phone: z.string().min(11).max(11),
      address: z.string().min(2).max(100),
    }),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(6).max(26),
  }),
});
