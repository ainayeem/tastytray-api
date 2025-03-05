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

  //   console.log("🚀 ~ createMealInDB ~ userId:", userId);
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

const getSingleMealFromDB = async (id: string) => {
  const result = await Meal.findById(id).populate("mealProvider");
  return result;
};

const updateMealInDB = async (id: string, payload: Partial<TMeal>) => {
  const result = await Meal.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return result;
};

const deleteMealInDB = async (id: string) => {
  await Meal.findByIdAndDelete(id);
  return null;
};

export const MealServices = {
  createMealInDB,
  getAllMealsFromDB,
  getSingleMealFromDB,
  updateMealInDB,
  deleteMealInDB,
};
