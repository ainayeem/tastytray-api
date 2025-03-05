import { Types } from "mongoose";

export type TMeal = {
  mealProvider: Types.ObjectId;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  availability: boolean;
  category: string;
  portionSize: string;
  dietaryPreferences?: string[];
  imgUrl: string;
};
