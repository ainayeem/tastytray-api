import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TCustomer } from "../customer/customer.interface";
import { Customer } from "../customer/customer.model";
import { TMealProvider } from "../mealProvider/mealProvider.interface";
import { MealProvider } from "../mealProvider/mealProvider.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";

const createMealProviderInDB = async (password: string, mealProviderData: TMealProvider) => {
  // create a user object
  const userData: Partial<TUser> = {};

  userData.email = mealProviderData.email;
  userData.password = password;
  userData.role = "mealProvider";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create user (t-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create user");
    }

    // create meal provider (t-2)
    mealProviderData.user = newUser[0]._id; //reference _id
    const newMealProvider = await MealProvider.create([mealProviderData], { session });
    if (!newMealProvider.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create meal provider");
    }

    await session.commitTransaction();
    await session.endSession();
    return newMealProvider;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    // Convert the error to a string before passing it to the Error constructor
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
};

const createCustomerInDB = async (password: string, customerData: TCustomer) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(customerData.email);
  if (user) {
    throw new AppError(StatusCodes.CONFLICT, "User is already exist!");
  }
  // create a user object
  const userData: Partial<TUser> = {};

  userData.email = customerData.email;
  userData.password = password;
  userData.role = "customer";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create user (t-1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create user");
    }

    // create customer (t-2)
    customerData.user = newUser[0]._id; //reference _id
    const newCustomer = await Customer.create([customerData], { session });
    if (!newCustomer.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create customer");
    }

    await session.commitTransaction();
    await session.endSession();
    return newCustomer;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    // Convert the error to a string before passing it to the Error constructor
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
};

const loginInDB = async (email: string, password: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User is not found!");
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, "Password not matched");
  }

  //create token and sent to the  client
  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);

  return accessToken;
};

const getMyProfileFromDB = async (user: JwtPayload) => {
  if (user.role === "customer") {
    const customer = await Customer.findOne({ user: user._id }).populate("user", "email role").lean();
    return customer;
  } else if (user.role === "mealProvider") {
    const mealProvider = await MealProvider.findOne({ user: user._id }).populate("user", "email role").lean();
    return mealProvider;
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid user role");
  }
};

const updateMyProfileInDB = async (user: JwtPayload, updateData: TMealProvider | TCustomer) => {
  const dbUser = await User.findById(user._id);
  if (!dbUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  if (dbUser._id.toString() !== user._id) {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized to update this user");
  }
  if (user.role === "customer") {
    const customer = await Customer.findOneAndUpdate({ user: user._id }, updateData, { new: true }).populate("user", "email role").lean();
    return customer;
  } else if (user.role === "mealProvider") {
    const mealProvider = await MealProvider.findOneAndUpdate({ user: user._id }, updateData, { new: true }).populate("user", "email role").lean();
    return mealProvider;
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid user role");
  }
};

export const UserServices = {
  createMealProviderInDB,
  createCustomerInDB,
  loginInDB,
  getMyProfileFromDB,
  updateMyProfileInDB,
};
