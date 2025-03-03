import { z } from "zod";

export const createMealValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()).min(1, "Ingredients must have at least 1 item"),
    price: z.number().min(0, "Price must be a positive number"),
    availability: z.boolean(),
    category: z.enum(["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"], {
      message: "Category must be one of Breakfast, Lunch, Dinner, Snack, Dessert",
    }),
    imgUrl: z.string(),
  }),
});
