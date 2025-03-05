import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    mealProvider: {
      type: Schema.Types.ObjectId,
      ref: "MealProvider",
      required: [true, "Meal provider is required"],
    },
    meals: [
      {
        meal: {
          type: Schema.Types.ObjectId,
          ref: "Meal",
          required: [true, "Meal is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    status: {
      type: String,
      enum: ["pending", "inProgress", "delivered"],
      default: "pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryTime: {
      type: String,
    },
    customizations: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>("Order", orderSchema);
