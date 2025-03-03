import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  role: "mealProvider" | "customer";
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
