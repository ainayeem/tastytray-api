import { Types } from "mongoose";

export type TMealProvider = {
  availableMeals: Types.ObjectId[];
  reviews: Types.ObjectId[];
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  cuisineSpecialties: string[];
  experience: number;
};
