import { Types } from "mongoose";

export type TOrder = {
  user: Types.ObjectId;
  meals: {
    meal: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  status: "pending" | "inProgress" | "delivered";
  orderDate: Date;
  deliveryTime?: string;
  customizations?: string[];
};
