import { model, Schema } from "mongoose";
import { TMealProvider } from "./mealProvider.interface";

const mealProviderSchema = new Schema<TMealProvider>(
  {
    availableMeals: {
      type: [Schema.Types.ObjectId],
      ref: "Meal",
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cuisineSpecialties: {
      type: [String],
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MealProvider = model<TMealProvider>("MealProvider", mealProviderSchema);
