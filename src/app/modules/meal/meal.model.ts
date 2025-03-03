import { model, Schema } from "mongoose";
import { TMeal } from "./meal.interface";

const mealSchema = new Schema<TMeal>(
  {
    mealProvider: {
      type: Schema.Types.ObjectId,
      ref: "MealProvider",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    availability: {
      type: Boolean,
      required: [true, "Availability is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
        message: "Category must be one of Breakfast, Lunch, Dinner, Snack, Dessert",
      },
    },
    imgUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  {
    timestamps: true,
  },
);

export const Meal = model<TMeal>("Meal", mealSchema);
