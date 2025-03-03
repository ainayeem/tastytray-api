import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { MealProvider } from "../mealProvider/mealProvider.model";
import { TMeal } from "./meal.interface";
import { Meal } from "./meal.model";

const createMealInDB = async (payload: TMeal, userId: Types.ObjectId) => {
  const mealProvider = await MealProvider.findOne({ user: userId });
  if (!mealProvider) {
    throw new Error("Meal provider not found");
  }
  payload.mealProvider = mealProvider._id;

  console.log("🚀 ~ createMealInDB ~ userId:", userId);
  const result = await Meal.create(payload);
  return result;
};

const getAllMealsFromDB = async (query: Record<string, unknown>) => {
  const MealSearchableFields = ["name", "description", "category"];
  const mealQuery = new QueryBuilder(Meal.find().populate("mealProvider"), query).search(MealSearchableFields).filter().sort().paginate().fields();

  const result = await mealQuery.modelQuery;
  const meta = await mealQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const MealServices = {
  createMealInDB,
  getAllMealsFromDB,
};
