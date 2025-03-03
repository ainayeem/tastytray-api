import { Types } from "mongoose";

export type TMealProvider = {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  cuisineSpecialties: string[];
  experience: string;
};
